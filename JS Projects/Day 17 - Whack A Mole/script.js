const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const highScoreBoard = document.querySelector(".high-score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start-btn");
const difficultySelect = document.getElementById("difficulty");
const messageDisplay = document.querySelector(".game-message");

let lastHole;
let timeUp = false;
let score = 0;
let gameRunning = false;

let highScore = localStorage.getItem("whackHighScore") || 0;
highScoreBoard.textContent = highScore;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const difficulty = difficultySelect.value;
  let minTime = 200;
  let maxTime = 1000;

  if (difficulty === "easy") {
    minTime = 500;
    maxTime = 1500;
  }
  if (difficulty === "hard") {
    minTime = 100;
    maxTime = 800;
  }

  const time = randomTime(minTime, maxTime);
  const hole = randomHole(holes);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  startBtn.disabled = true;
  startBtn.textContent = "Playing...";
  messageDisplay.textContent = "Whack 'em!";
  messageDisplay.style.opacity = "1";
  peep();

  setTimeout(() => {
    timeUp = true;
    gameRunning = false;
    startBtn.disabled = false;
    startBtn.textContent = "Start Game!";
    messageDisplay.textContent = "Game Over!";
    checkHighScore();
  }, 10000);
}

function checkHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("whackHighScore", highScore);
    highScoreBoard.textContent = highScore;
    messageDisplay.textContent = "New High Score!";
  }
}

function bonk(e) {
  if (!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
