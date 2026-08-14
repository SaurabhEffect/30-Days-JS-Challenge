const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
const targets = document.querySelectorAll(".slide-in");
targets.forEach((target) => observer.observe(target));
