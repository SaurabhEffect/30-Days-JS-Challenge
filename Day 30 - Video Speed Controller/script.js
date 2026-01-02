const speed = document.querySelector(".speed");
const bar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");
const buttons = document.querySelectorAll(".controls button");
let isDown = false;
function handleMove(e) {
  const y = e.pageY - speed.offsetTop;
  const percent = y / speed.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + "%";
  const playbackRate = percent * (max - min) + min;
  updateUI(height, playbackRate);
}
function updateUI(heightStr, rate) {
  if (rate < 0.4) rate = 0.4;
  if (rate > 4) rate = 4;
  bar.style.height = heightStr;
  bar.textContent = rate.toFixed(1) + "×";
  video.playbackRate = rate;
}

speed.addEventListener("mousedown", (e) => {
  isDown = true;
  handleMove(e);
});
speed.addEventListener("mouseleave", () => (isDown = false));
speed.addEventListener("mouseup", () => (isDown = false));
speed.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  handleMove(e);
});

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const rate = parseFloat(this.dataset.speed);
    const min = 0.4;
    const max = 4;
    const percent = (rate - min) / (max - min);
    const height = Math.round(percent * 100) + "%";
    updateUI(height, rate);
  });
});

window.addEventListener("keydown", (e) => {
  const step = 0.1;
  let current = video.playbackRate;
  if (e.key === "=" || e.key === "+") {
    current += step;
    const percent = (current - 0.4) / (4 - 0.4);
    updateUI(Math.round(percent * 100) + "%", current);
  } else if (e.key === "-") {
    current -= step;
    const percent = (current - 0.4) / (4 - 0.4);
    updateUI(Math.round(percent * 100) + "%", current);
  }
});
