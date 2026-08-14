const triggers = document.querySelectorAll("a");
const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.appendChild(highlight);

const activeLink = document.querySelector(".menu a.active");

function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX,
  };

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;

  if (this.closest(".menu")) {
    highlight.classList.add("nav-mode");
    highlight.classList.remove("text-mode");
    highlight.style.width = `${coords.width + 10}px`;
    highlight.style.transform = `translate(${coords.left - 5}px, ${
      coords.top
    }px)`;
  } else {
    highlight.classList.add("text-mode");
    highlight.classList.remove("nav-mode");
    highlight.style.width = `${coords.width + 4}px`;
    highlight.style.height = `${coords.height - 4}px`;
    highlight.style.transform = `translate(${coords.left - 2}px, ${
      coords.top + 4
    }px)`;
  }
}

function handleResize() {
  const currentActive = document.querySelector(".menu a.active");
  if (currentActive) highlightLink.call(currentActive);
}
triggers.forEach((a) => a.addEventListener("mouseenter", highlightLink));
window.addEventListener("load", () => {
  if (activeLink) highlightLink.call(activeLink);
});
window.addEventListener("resize", handleResize);
