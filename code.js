const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 600, 600);

// test square (snake head placeholder)
ctx.fillStyle = "white";
ctx.fillRect(100, 100, 20, 20);