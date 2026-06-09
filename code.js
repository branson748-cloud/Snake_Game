const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

// starting position
let x = 100;
let y = 100;

// direction
let dx = box;
let dy = 0;

function draw() {
  // clear screen
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 600);

  ctx.fillStyle = "white";
  ctx.fillRect(x, y, box, box);

  // movements
  x += dx;
  y += dy;

  // wall collision
  if (x < 0 || x >= 1000 || y < 0 || y >= 600) {
    clearInterval(game);
    alert("Game Over!");
  }
}

// run game loop every 100ms
setInterval(draw, 100);

document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp") {
    if (dy !== box) {
      dx = 0;
      dy = -box;
    }
  }

  if (event.key === "ArrowDown") {
    if (dy !== -box) {
      dx = 0;
      dy = box;
    }
  }

  if (event.key === "ArrowLeft") {
    if (dx !== box) {
      dx = -box;
      dy = 0;
    }
  }

  if (event.key === "ArrowRight") {
    if (dx !== -box) {
      dx = box;
      dy = 0;
    }
  }

});