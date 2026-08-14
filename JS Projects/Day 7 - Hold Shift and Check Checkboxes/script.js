const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey) {
    const isChecking = this.checked;
    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = isChecking;
        const item = checkbox.parentElement;
        item.classList.remove("just-checked", "just-unchecked");
        if (isChecking) {
          item.classList.add("just-checked");
        } else {
          item.classList.add("just-unchecked");
        }
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);

document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("animationend", function () {
    this.classList.remove("just-checked", "just-unchecked");
  });
});
