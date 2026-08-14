const dot = document.createElement("div");
dot.classList.add("cursor-dot");
document.body.appendChild(dot);

const circle = document.createElement("div");
circle.classList.add("cursor-circle");
document.body.appendChild(circle);

let targetX = 0;
let targetY = 0;
let currentCircleX = 0;
let currentCircleY = 0;
const easing = 0.15;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  dot.style.left = `${targetX}px`;
  dot.style.top = `${targetY}px`;
});

function animate() {
  let dx = targetX - currentCircleX;
  let dy = targetY - currentCircleY;
  currentCircleX += dx * easing;
  currentCircleY += dy * easing;
  circle.style.left = `${currentCircleX}px`;
  circle.style.top = `${currentCircleY}px`;
  requestAnimationFrame(animate);
}

animate();

document.addEventListener("mousedown", () => {
  dot.classList.add("cursor-click");
});

document.addEventListener("mouseup", () => {
  dot.classList.remove("cursor-click");
});
