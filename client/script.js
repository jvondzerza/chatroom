let socket = io.connect();
const all = document.getElementById("all");
const me= document.getElementById("me");
let target = document.getElementById("target");
let input = document.getElementById("input");
let username = document.getElementById("username");
let submit = document.getElementById("submit");
let colors = document.getElementById("colors");
let loginTimeline = gsap.timeline();
let loginTimelineCtd = gsap.timeline({repeat: -1});
let logoTimeline = gsap.timeline();

let colorArr = ["Black", "Red", "Yellow", "Blue", "Green", "Purple"];

colorArr.forEach(color => {
    let option = document.createElement("option");
    option.className = "color";
    option.innerText = color;
    colors.appendChild(option);
})


window.addEventListener("load", () => {
    loginTimeline
        .fromTo('#login-logo', {opacity: 0, y: 100, x: 150, skewX: 5}, {opacity: 1, y: 0, x: 0, skewX: 0, rotation: 0, ease: "slow(0.1, 2, false)", duration: 2.5})
    loginTimelineCtd
        .to('#login-logo', {x: 5, rotation: 10, rotationY: 75, duration: 0.2, delay: 5})
        .to('#login-logo', {x: -5, rotation: -10, rotationY: -75, duration: 0.2})
        .to('#login-logo', {x: 0, rotation: 0, rotationY: 0, duration: 0.4, ease: "slow(0.1, 2, false)"})
})

submit.addEventListener("click", () => {
    document.getElementById("login").style.display = "none";
    socket.emit('logUser', (username.value));
    logoTimeline.fromTo('#logo', {opacity: 0, y: 100, x: 150, skewX: 5}, {opacity: 1, y: 0, x: 0, skewX: 0, rotation: 0, ease: "slow(0.1, 2, false)", duration: 2})
})

all.addEventListener("click", () => {
    socket.emit('sendToAll', (` ${username.value}: ${input.value}`));
    target.style.color = colors.value
    input.style.color = colors.value;
})

me.addEventListener("click", () => {
    socket.emit('sendToMe', (` ${username.value}: ${input.value}`));
    target.style.color = colors.value;
    input.style.color = colors.value;
})

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message;
});

socket.on('displayUser', (user) => {
    target.innerHTML += '<br>' + user + " joined the chat.";
})

socket.on('userLeft', (user) => {
    target.innerHTML += '<br>' + user + " left the chat.";
})

