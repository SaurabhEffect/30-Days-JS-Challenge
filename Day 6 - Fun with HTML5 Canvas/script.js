const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const clearButton = document.querySelector("#clearButton");
const brushSizeSlider = document.querySelector("#brushSize");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = brushSizeSlider.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function drawDefaultHey() {
  let x = canvas.width / 2 - 120;
  let y = canvas.height / 2;
  ctx.strokeStyle = `hsl(25, 100%, 55%)`;
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(x, y - 50);
  ctx.quadraticCurveTo(x + 5, y, x, y + 50);
  ctx.stroke();

  ctx.strokeStyle = `hsl(35, 100%, 55%)`;
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(x + 50, y - 50);
  ctx.quadraticCurveTo(x + 45, y, x + 50, y + 50);
  ctx.stroke();

  ctx.strokeStyle = `hsl(45, 100%, 55%)`;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(x - 5, y);
  ctx.quadraticCurveTo(x + 25, y + 5, x + 55, y);
  ctx.stroke();

  x += 80;
  ctx.strokeStyle = `hsl(140, 100%, 45%)`;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.moveTo(x + 35, y + 5);
  ctx.quadraticCurveTo(x + 15, y - 2, x, y + 5);
  ctx.arc(x + 18, y + 10, 25, 0.1, Math.PI * 1.8, false);
  ctx.stroke();

  x += 70;
  ctx.strokeStyle = `hsl(200, 100%, 50%)`;
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(x, y - 25);
  ctx.quadraticCurveTo(x + 10, y + 10, x + 20, y + 15);
  ctx.quadraticCurveTo(x + 30, y + 10, x + 40, y - 25);
  ctx.moveTo(x + 20, y + 15);
  ctx.quadraticCurveTo(x + 15, y + 50, x + 10, y + 60);
  ctx.stroke();
  ctx.lineWidth = brushSizeSlider.value;
  hue = 220;
}

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

brushSizeSlider.addEventListener("input", (e) => {
  ctx.lineWidth = e.target.value;
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    hue = Math.floor(Math.random() * 360);
  }
});

drawDefaultHey();
