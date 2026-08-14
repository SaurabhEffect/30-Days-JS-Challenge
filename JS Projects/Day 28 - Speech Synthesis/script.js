const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const pauseButton = document.querySelector("#pause");
const voiceinator = document.querySelector(".voiceinator");
const textArea = document.querySelector('[name="text"]');
const textDisplay = document.querySelector(".text-display");
const rangeInputs = document.querySelectorAll('input[type="range"]');
msg.text = textArea.value;
function populateVoices() {
  voices = this.getVoices();
  const selectedVoice = voicesDropdown.value;
  voicesDropdown.innerHTML = voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
  if (selectedVoice) {
    voicesDropdown.value = selectedVoice;
  }
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  voiceinator.classList.remove("speaking");
  textArea.classList.remove("hidden");
  textDisplay.classList.add("hidden");
  pauseButton.innerText = "Pause";
  if (startOver) {
    msg.text = textArea.value;
    setupKaraoke(msg.text);
    speechSynthesis.speak(msg);
    voiceinator.classList.add("speaking");
  }
}

function setOption() {
  msg[this.name] = this.value;
  const badge = this.previousElementSibling.querySelector(".value-badge");
  if (badge) badge.textContent = this.value;
  if (speechSynthesis.speaking) {
    toggle();
  }
}

function setupKaraoke(text) {
  textArea.classList.add("hidden");
  textDisplay.classList.remove("hidden");
  const words = text.split(/(\s+)/);
  const html = words
    .map((word, i) => `<span data-index="${i}">${word}</span>`)
    .join("");
  textDisplay.innerHTML = html;
}

msg.addEventListener("boundary", function (event) {
  if (event.name === "word") {
    const spans = textDisplay.querySelectorAll("span");
    let charCount = 0;
    spans.forEach((span) => {
      span.classList.remove("highlight");
      const spanLength = span.textContent.length;
      if (
        charCount <= event.charIndex &&
        charCount + spanLength > event.charIndex
      ) {
        if (span.textContent.trim().length > 0) {
          span.classList.add("highlight");
          span.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      charCount += spanLength;
    });
  }
});

msg.addEventListener("end", () => {
  voiceinator.classList.remove("speaking");
  textArea.classList.remove("hidden");
  textDisplay.classList.add("hidden");
});

function handlePause() {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    pauseButton.innerText = "Pause";
    voiceinator.classList.add("speaking");
  } else if (speechSynthesis.speaking) {
    speechSynthesis.pause();
    pauseButton.innerText = "Resume";
    voiceinator.classList.remove("speaking");
  }
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
options.forEach((option) => option.addEventListener("input", setOption));
speakButton.addEventListener("click", () => toggle(true));
stopButton.addEventListener("click", () => toggle(false));
pauseButton.addEventListener("click", handlePause);
populateVoices();
