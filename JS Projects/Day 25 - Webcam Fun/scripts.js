const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");
const flashOverlay = document.querySelector(".flash-overlay");
const filterButtons = document.querySelectorAll(".buttons button");
let currentEffect = "normal";

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(`OH NO!!!`, err);
      alert("Please enable your webcam to use this booth!");
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    switch (currentEffect) {
      case "redEffect":
        pixels = redEffect(pixels);
        break;
      case "rgbSplit":
        pixels = rgbSplit(pixels);
        break;
      case "grayscale":
        pixels = grayscale(pixels);
        break;
      case "ghost":
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        break;
      default:
        ctx.globalAlpha = 1;
    }

    if (currentEffect !== "ghost") {
      ctx.putImageData(pixels, 0, 0);
    }
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  flashOverlay.classList.add("flash");
  setTimeout(() => {
    flashOverlay.classList.remove("flash");
  }, 200);

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "neon_booth_snap");
  link.innerHTML = `<img src="${data}" alt="Cool Snap" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // BLUE
  }
  return pixels;
}

function grayscale(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const avg =
      0.3 * pixels.data[i] +
      0.59 * pixels.data[i + 1] +
      0.11 * pixels.data[i + 2];
    pixels.data[i] = avg; // R
    pixels.data[i + 1] = avg; // G
    pixels.data[i + 2] = avg; // B
  }
  return pixels;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    currentEffect = e.target.dataset.filter;
  });
});

getVideo();
video.addEventListener("canplay", paintToCanvas);
