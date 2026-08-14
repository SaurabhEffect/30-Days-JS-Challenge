window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "en-US";

const emojiMap = {
  poop: "💩",
  shit: "💩",
  dump: "💩",
  love: "❤️",
  heart: "❤️",
  happy: "😊",
  smile: "😊",
  sad: "😢",
  cry: "😭",
  fire: "🔥",
  lit: "🔥",
  idea: "💡",
  question: "❓",
  star: "⭐",
  check: "✅",
};

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);
let isStopped = false;

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  if (e.results[0].isFinal) {
    if (handleVoiceCommands(transcript)) {
      return;
    }
  }

  let enhancedScript = transcript;
  Object.keys(emojiMap).forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    enhancedScript = enhancedScript.replace(regex, emojiMap[key]);
  });
  p.textContent = enhancedScript;
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    words.appendChild(p);
    scrollToBottom();
  }
});

recognition.addEventListener("end", () => {
  if (!isStopped) {
    recognition.start();
  }
});
recognition.start();

function handleVoiceCommands(text) {
  const lowerText = text.toLowerCase().trim();
  const statusEl = document.getElementById("status");
  if (
    lowerText.includes("delete everything") ||
    lowerText.includes("clear all")
  ) {
    clearPad();
    return true;
  }

  if (lowerText.includes("dark mode") || lowerText.includes("lights off")) {
    document.body.classList.add("dark-mode");
    return true;
  }

  if (lowerText.includes("light mode") || lowerText.includes("lights on")) {
    document.body.classList.remove("dark-mode");
    return true;
  }

  if (lowerText.includes("stop listening") || lowerText.includes("pause")) {
    isStopped = true;
    recognition.stop();
    if (statusEl) {
      statusEl.innerText =
        "Paused (Click refresh or say nothing to keep paused)";
      statusEl.style.animation = "none";
      statusEl.style.color = "grey";
    }
    return true;
  }

  return false;
}

function scrollToBottom() {
  words.scrollTop = words.scrollHeight;
}

function clearPad() {
  words.innerHTML = "";
  p = document.createElement("p");
  words.appendChild(p);
}

function copyText() {
  const text = words.innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Text copied!");
  });
}

function downloadText() {
  const text = words.innerText;
  const blob = new Blob([text], { type: "text/plain" });
  const anchor = document.createElement("a");
  anchor.download = "my-speech-notes.txt";
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target = "_blank";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
