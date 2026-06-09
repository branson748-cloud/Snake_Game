const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
  { x: 500,
    y: 300 }
];

let food = {
  x: Math.floor(Math.random() * (1000 / box)) * box,
  y: Math.floor(Math.random() * (600 / box)) * box
};

let dx = box;  // 👉 direction X (start moving right)
let dy = 0;    // 👉 direction Y

let game = setInterval(draw, 100);

function draw() {

  let newHead = {
    x: snake[0].x + dx, 
    y: snake[0].y + dy
  };

  snake.unshift(newHead);

  snake.pop();

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 600);

  /*
  ========================================
  5. DRAW SNAKE
  ========================================
  */
  ctx.fillStyle = "white";

  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );
  }


  let head = snake[0];

  if (
    head.x < 0 ||
    head.x >= 1000 ||
    head.y < 0 ||
    head.y >= 600
  ) {
    clearInterval(game);
    alert("Game Over!");
  }
}


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