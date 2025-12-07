let countdown;
let isPaused = false;
let secondsRemaining = 0;

const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const audio = document.getElementById("timer-beep");
const manualControls = document.querySelector(".timer__manual-controls");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
const body = document.body;

function timer(seconds) {
  clearInterval(countdown);
  body.classList.remove("times-up");
  manualControls.classList.add("visible");
  isPaused = false;
  updatePauseButtonIcon();
  const now = Date.now();
  const then = now + seconds * 1000;
  secondsRemaining = seconds;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    if (isPaused) return;
    secondsRemaining--;
    if (secondsRemaining < 0) {
      clearInterval(countdown);
      timeFinished();
      return;
    }
    displayTimeLeft(secondsRemaining);
  }, 1000);
}

function timeFinished() {
  timerDisplay.textContent = "00:00";
  document.title = "Time's Up!";
  body.classList.add("times-up");
  audio.play();
  manualControls.classList.remove("visible");
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainderMinutes = Math.floor((seconds % 3600) / 60);
  const remainderSeconds = seconds % 60;
  let display;
  if (hours > 0) {
    display = `${hours}:${
      remainderMinutes < 10 ? "0" : ""
    }${remainderMinutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
  } else {
    display = `${remainderMinutes}:${
      remainderSeconds < 10 ? "0" : ""
    }${remainderSeconds}`;
  }
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  buttons.forEach((btn) => btn.classList.remove("active"));
  this.classList.add("active");
  timer(seconds);
}

function togglePause() {
  isPaused = !isPaused;
  if (!isPaused) {
    const now = Date.now();
    const then = now + secondsRemaining * 1000;
    displayEndTime(then);
  } else {
    endTime.textContent = "Timer Paused";
  }
  updatePauseButtonIcon();
}

function updatePauseButtonIcon() {
  const icon = pauseButton.querySelector("i");
  if (isPaused) {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  } else {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  }
}

function stopTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = "00:00";
  document.title = "Countdown Timer";
  endTime.textContent = "Stopped";
  manualControls.classList.remove("visible");
  buttons.forEach((btn) => btn.classList.remove("active"));
  isPaused = false;
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (isNaN(mins)) return;
  timer(mins * 60);
  this.reset();
  buttons.forEach((btn) => btn.classList.remove("active"));
});

pauseButton.addEventListener("click", togglePause);
stopButton.addEventListener("click", stopTimer);
