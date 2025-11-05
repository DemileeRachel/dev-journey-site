document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const clock = document.getElementById("uk-clock");
  const greeting = document.getElementById("greeting");
  const greetBtn = document.getElementById("greetBtn");
  const emojiContainer = document.getElementById("emoji-container");
  const themeToggle = document.getElementById("theme-toggle");
  const typingGame = document.getElementById("typing-game");
  const typingInput = document.getElementById("typing-input");
  const typingFeedback = document.getElementById("typing-feedback");

  /* === NAV MENU === */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  /* === CLOCK === */
  function updateUKClock() {
    const now = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    if (clock) clock.textContent = now;
  }
  setInterval(updateUKClock, 1000);
  updateUKClock();

  /* === GREETING + NAME === */
  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning! ☀️";
    if (h < 18) return "Good Afternoon! ☕";
    return "Good Evening! 🌙";
  }

  let name = localStorage.getItem("visitorName");
  if (!name) {
    name = prompt("What's your name?");
    if (name) localStorage.setItem("visitorName", name);
  }
  function updateGreeting() {
    if (greeting) greeting.textContent = `${getGreeting()} ${name || ""} 💜`;
  }
  updateGreeting();
  setInterval(updateGreeting, 60000);

  /* === FLOATING EMOJIS === */
  function spawnEmoji() {
    if (!emojiContainer) return;
    const emojis = ["💻", "🌸", "🚀", "✨", "🧠", "💡", "🎨"];
    const emoji = document.createElement("div");
    emoji.className = "float-emoji";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = 3 + Math.random() * 3 + "s";
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
  }
  setInterval(spawnEmoji, 1800);

  /* === THEME TOGGLE === */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.body.classList.add(savedTheme);

  function toggleTheme() {
    if (document.body.classList.contains("dark")) {
      document.body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
    } else if (document.body.classList.contains("light")) {
      document.body.classList.replace("light", "");
      localStorage.removeItem("theme");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  /* === FUN BUTTON + MINI TYPING GAME === */
  if (greetBtn) {
    greetBtn.addEventListener("click", () => {
      greetBtn.classList.add("clicked");
      greetBtn.textContent = "Typing Challenge! ⌨️";
      setTimeout(() => {
        greetBtn.classList.remove("clicked");
        greetBtn.textContent = "Do you press?";
        if (typingGame) typingGame.style.display = "block";
        startTypingGame();
      }, 1000);
    });
  }

  const sentences = [
    "Code with curiosity.",
    "Debugging is fun.",
    "Keep building amazing things.",
    "Persistence makes progress.",
  ];

  function startTypingGame() {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("typing-sentence").textContent = randomSentence;
    typingInput.value = "";
    typingFeedback.textContent = "";

    typingInput.addEventListener("input", () => {
      if (typingInput.value === randomSentence) {
        typingFeedback.textContent = "🎉 Perfect! You typed it!";
        typingFeedback.style.color = "green";
      } else if (randomSentence.startsWith(typingInput.value)) {
        typingFeedback.textContent = "Keep going...";
        typingFeedback.style.color = "gray";
      } else {
        typingFeedback.textContent = "Oops! Try again.";
        typingFeedback.style.color = "red";
      }
    });
  }
});
// === CHANGE NAME BUTTON ===
const changeNameBtn = document.getElementById("changeName");
if (changeNameBtn) {
  changeNameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newName = prompt("Enter your new name:");
    if (newName && newName.trim() !== "") {
      localStorage.setItem("visitorName", newName.trim());
      window.location.reload();
    }
  });
}
