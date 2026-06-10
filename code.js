const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let score = 0;

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

  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      clearInterval(game);
      alert(`You bumped into yourself! Game Over! Your score: ${score}`);
      return;
    }
  }

let ateFood = (newHead.x === food.x && newHead.y === food.y);

snake.unshift(newHead);

if (ateFood) {
  score++;

  food = {
    x: Math.floor(Math.random() * (1000 / box)) * box,
    y: Math.floor(Math.random() * (600 / box)) * box
  };

} else {
  snake.pop();
}
  

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 600);

  ctx.fillStyle = "white";
  
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 30);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );
  }

  ctx.fillStyle = "red";

  ctx.beginPath();

  ctx.arc(
    food.x + box/2,
    food.y + box/2,
    box/2,
    0,
    Math.PI * 2
  );

  ctx.fill();

  if (
    newHead.x < 0 ||
    newHead.x >= 1000 ||
    newHead.y < 0 ||
    newHead.y >= 600
  ) {
    clearInterval(game);
    alert(`You bumped into the wall. Game Over! Your score: ${score}`);
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