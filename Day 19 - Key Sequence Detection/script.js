const pressed = [];
const secretCode = "saurabh";
const currentKeyDisplay = document.getElementById("currentKey");
const historyDisplay = document.getElementById("keyHistory");
const successMsg = document.getElementById("successMsg");
window.addEventListener("keyup", (e) => {
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  currentKeyDisplay.innerText = e.key;
  currentKeyDisplay.classList.remove("pop-anim");
  void currentKeyDisplay.offsetWidth;
  currentKeyDisplay.classList.add("pop-anim");
  historyDisplay.innerText = pressed.join(" ");
  if (pressed.join("").includes(secretCode)) {
    triggerSuccess();
  }
});

function triggerSuccess() {
  console.log("DING DING! Secret Code Activated.");
  successMsg.style.display = "block";
  currentKeyDisplay.style.color = "#ff3333";
  raptorize();
  setTimeout(() => {
    successMsg.style.display = "none";
    currentKeyDisplay.style.color = "#fff";
  }, 5000);
}

function raptorize() {
  const audio = new Audio(
    "https://raw.githubusercontent.com/randomvlad/raptorize-jquery/master/sounds/raptor-sound.mp3"
  );
  const raptor = document.createElement("img");
  raptor.src =
    "https://raw.githubusercontent.com/randomvlad/raptorize-jquery/master/images/raptor.png";
  raptor.style.position = "fixed";
  raptor.style.bottom = "-300px";
  raptor.style.right = "0";
  raptor.style.zIndex = "99999";
  raptor.style.width = "400px";
  raptor.style.transition = "bottom 0.5s ease-out";
  document.body.appendChild(raptor);

  audio
    .play()
    .catch((e) =>
      console.log(
        "Audio requires interaction first usually, but keypress counts!"
      )
    );

  setTimeout(() => {
    raptor.style.bottom = "0";
  }, 100);
  setTimeout(() => {
    raptor.style.transition = "right 2.5s ease-in";
    raptor.style.right = "120%";
  }, 2000);
  setTimeout(() => {
    raptor.remove();
  }, 5000);
}

function showHint() {
  const hintEl = document.getElementById("hint");
  hintEl.style.opacity = "1";
  setTimeout(() => {
    hintEl.style.opacity = "0";
  }, 3000);
}
