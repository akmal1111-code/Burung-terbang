const bird = document.getElementById("bird");
const container = document.getElementById("game-container");
const pipeTop = document.querySelector(".pipe-top");
const pipeBottom = document.querySelector(".pipe-bottom");
const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");
const scoreDisplay = document.getElementById("score-display");
const restartButton = document.getElementById("restart-button");

let birdTop = 250;
let gravity = 3;
let isGameOver = false;
let isStarted = false;
let score = 0;

let pipeLeft = 400;
let gap = 150;
let pipeHeight = Math.floor(Math.random() * 250) + 50;

function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
}

function gameOver() {
  isGameOver = true;
  scoreDisplay.style.display = "none";
  restartButton.style.display = "block";
  alert("Game Over! Skor kamu: " + score);
}

function fall() {
  birdTop += gravity;
  bird.style.top = birdTop + "px";
}

function jump() {
  if (!isGameOver && isStarted) {
    birdTop -= 40;
  } else if (isGameOver) {
    location.reload();
  }
}

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

function movePipe() {
  pipeLeft -= 3;

  if (pipeLeft < -60) {
    pipeLeft = 400;
    pipeHeight = Math.floor(Math.random() * 250) + 50;
    score++;
  }

  pipeTop.style.left = pipeLeft + "px";
  pipeTop.style.height = pipeHeight + "px";

  pipeBottom.style.left = pipeLeft + "px";
  pipeBottom.style.height = (600 - pipeHeight - gap) + "px";
}

function checkCollision() {
  if (
    birdTop >= 570 || birdTop <= 0 ||
    (pipeLeft <= 130 && pipeLeft >= 70 &&
      (birdTop <= pipeHeight || birdTop >= pipeHeight + gap))
  ) {
    gameOver();
  }
}

function gameLoop() {
  if (isStarted && !isGameOver) {
    fall();
    movePipe();
    checkCollision();
    requestAnimationFrame(gameLoop);
  }
}

startButton.addEventListener("click", () => {
  startMenu.style.display = "none";
  isStarted = true;
  gameLoop();
});


restartButton.addEventListener("click", () => {
  location.reload(); // Restart game
});
