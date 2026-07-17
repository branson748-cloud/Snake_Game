const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startStopButton = document.getElementById("startStop");
const restartButton = document.getElementById("restart");
const scoreText = document.getElementById("score");
const highscoreText = document.getElementById("highscore");

const box = 25;
const canvasSize = 500;

let score = 0;

let highScore = localStorage.getItem("highScore");
highScore = highScore ? parseInt(highScore) : 0;

let gameOver = false;

let snake = [
  { x: 250, y: 250 }
];

let dx = box;
let dy = 0;

let nextDx = dx;
let nextDy = dy;

let food = {};
let game = null;
let gameRunning = false;

// =====================
// FOOD SPAWNER
// =====================
function spawnFood() {
  let foodOnSnake = true;

  while (foodOnSnake) {
    foodOnSnake = false;

    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };

    for (let i = 0; i < snake.length; i++) {
      if (food.x === snake[i].x && food.y === snake[i].y) {
        foodOnSnake = true;
      }
    }
  }
}

// =====================
// UPDATE SCORE DISPLAY
// =====================
function updateScoreDisplay() {
  scoreText.textContent = "Score: " + score;
  highscoreText.textContent = "High Score: " + highScore;
}

// =====================
// DRAW BOARD
// =====================
function drawBoard() {
  // background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // snake
  ctx.fillStyle = "white";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // food
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

// =====================
// STOP GAME
// =====================
function stopGame() {
  if (gameRunning) {
    clearInterval(game);
    game = null;
    gameRunning = false;

    startStopButton.textContent = "START";
    restartButton.disabled = false;
  }
}

// =====================
// GAME LOOP
// =====================
function draw() {
  // apply buffered movement
  dx = nextDx;
  dy = nextDy;

  // create new head
  let newHead = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // wall collision
  if (
    newHead.x < 0 ||
    newHead.x >= canvasSize ||
    newHead.y < 0 ||
    newHead.y >= canvasSize
  ) {
    gameOver = true;
    stopGame();
    alert(`You hit the wall! Score: ${score}`);
    return;
  }

  // self collision
  for (let i = 1; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      gameOver = true;
      stopGame();
      alert(`Game over! Score: ${score}`);
      return;
    }
  }

  // move snake
  snake.unshift(newHead);

  let ateFood = (newHead.x === food.x && newHead.y === food.y);

  if (ateFood) {
    score++;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }

    spawnFood();
  } else {
    snake.pop();
  }

  updateScoreDisplay();
  drawBoard();
}

// =====================
// START GAME
// =====================
function startGame() {
  if (gameOver) {
    return;
  }
  if (!gameRunning) {
    game = setInterval(draw, 90);
    gameRunning = true;

    startStopButton.textContent = "STOP";
    restartButton.disabled = true;
  }
}

// =====================
// RESET GAME
// =====================
function resetGame() {
  if (gameRunning) {
    return;
  }

  gameOver = false;

  score = 0;

  snake = [
    { x: 250, y: 250 }
  ];

  dx = box;
  dy = 0;
  nextDx = dx;
  nextDy = dy;

  spawnFood();
  updateScoreDisplay();
  drawBoard();

  startStopButton.textContent = "START";
  restartButton.disabled = false;
}

// =====================
// BUTTON EVENTS
// =====================
startStopButton.addEventListener("click", function() {
  if (gameRunning) {
    stopGame();
  } else {
    startGame();
  }
});

restartButton.addEventListener("click", resetGame);

// =====================
// KEYBOARD CONTROLS
// =====================
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
    event.preventDefault(); // stops page from scrolling when space is pressed

    if (gameRunning) {
      stopGame();
    } else {
      startGame();
    }
    return;
  }

  if (event.key === "r" || event.key === "R") {
    resetGame();
    return;
  }
  
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

// =====================
// INITIAL SETUP
// =====================
spawnFood();
updateScoreDisplay();
drawBoard();