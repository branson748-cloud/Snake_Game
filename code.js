const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 25;

let score = 0;

let highScore = localStorage.getItem("highScore");
highScore = highScore ? parseInt(highScore) : 0;

let snake = [
  { x: 300, y: 300 }
];

let food = {
  x: Math.floor(Math.random() * (500 / box)) * box,
  y: Math.floor(Math.random() * (500 / box)) * box
};

let dx = box;
let dy = 0;

let nextDx = dx;
let nextDy = dy;

let game = setInterval(draw, 90);

// =====================
// GAME FUNCTION
// =====================
function draw() {

  // Apply buffered movement
  dx = nextDx;
  dy = nextDy;

  // Create new head
  let newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // SELF COLLISION
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      clearInterval(game);
      alert(`Game Over! Your score: ${score}`);
      return;
    }
  }

  snake.unshift(newHead);

  let ateFood = (newHead.x === food.x && newHead.y === food.y);

  if (ateFood) {
  score++;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  let foodOnSnake = true;

  while (foodOnSnake) {
    foodOnSnake = false;

    food = {
      x: Math.floor(Math.random() * (500 / box)) * box,
      y: Math.floor(Math.random() * (500 / box)) * box
    };

    for (let i = 0; i < snake.length; i++) {
      if (food.x === snake[i].x && food.y === snake[i].y) {
        foodOnSnake = true;
      }
    }
  }

} else {
  snake.pop();
}

  document.getElementById("score").textContent =
    "Score: " + score;

  document.getElementById("highscore").textContent =
  "High Score: " + highScore;

  if (
    newHead.x < 0 ||
    newHead.x >= 500 ||
    newHead.y < 0 ||
    newHead.y >= 500
  ) {
    clearInterval(game);
    alert(`You hit the wall! Score: ${score}`);
    return;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 500, 500);

  // Draw snake
  ctx.fillStyle = "white";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );
  }

  document.getElementById("score").textContent =
  "Score: " + score;

  document.getElementById("highscore").textContent =
  "High Score: " + highScore;

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";

  // Draw food (red circle)
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    food.x + box / 2,
    food.y + box / 2,
    box / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

//RESET GAME
function resetGame() {

  score = 0;

  snake = [
    { x: 250, y: 250 }
  ];

  dx = box;
  dy = 0;

  nextDx = dx;
  nextDy = dy;

  food = {
    x: Math.floor(Math.random() * (500 / box)) * box,
    y: Math.floor(Math.random() * (500 / box)) * box
  };

  clearInterval(game);
  game = setInterval(draw, 90);

  document.getElementById("score").textContent =
  "Score: 0";
}

document.getElementById("restart").addEventListener("click", resetGame);

document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp" && nextDy === 0) {
    nextDx = 0;
    nextDy = -box;
  }

  if (event.key === "ArrowDown" && nextDy === 0) {
    nextDx = 0;
    nextDy = box;
  }

  if (event.key === "ArrowLeft" && nextDx === 0) {
    nextDx = -box;
    nextDy = 0;
  }

  if (event.key === "ArrowRight" && nextDx === 0) {
    nextDx = box;
    nextDy = 0;
  }

});