const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const muteButton = player.querySelector(".mute");
const timeDisplay = player.querySelector(".time-display");
const playbackDisplay = player.querySelector(".playback-display");
const fullscreenButton = player.querySelector(".fullscreen");
const progressTooltip = player.querySelector(".progress__tooltip");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  if (this.name === "playbackRate") {
    playbackDisplay.textContent = `${this.value}x`;
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  const currentTime = formatTime(video.currentTime);
  const totalDuration = formatTime(video.duration || 0);
  timeDisplay.textContent = `${currentTime} / ${totalDuration}`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleMute() {
  video.muted = !video.muted;
  muteButton.textContent = video.muted ? "🔇" : "🔊";
}

function updateMuteIcon() {
  if (video.muted || video.volume === 0) {
    muteButton.textContent = "🔇";
  } else if (video.volume < 0.5) {
    muteButton.textContent = "🔉";
  } else {
    muteButton.textContent = "🔊";
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    player
      .requestFullscreen()
      .catch((err) =>
        console.error(`Error attempting to enable full-screen: ${err.message}`)
      );
    fullscreenButton.textContent = "⤡";
  } else {
    document.exitFullscreen();
    fullscreenButton.textContent = "⤢";
  }
}

function handleProgressHover(e) {
  const hoverTime = (e.offsetX / progress.offsetWidth) * video.duration;
  if (!isNaN(hoverTime)) {
    progressTooltip.textContent = formatTime(hoverTime);
    progressTooltip.style.left = `${e.offsetX}px`;
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("volumechange", updateMuteIcon);
video.addEventListener("loadedmetadata", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) => range.addEventListener("input", handleRangeUpdate));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousemove", handleProgressHover);
muteButton.addEventListener("click", toggleMute);
fullscreenButton.addEventListener("click", toggleFullscreen);
