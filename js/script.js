document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const greetBtn = document.getElementById('greetBtn');
  const emojiContainer = document.getElementById('emoji-container');
  const clock = document.getElementById('uk-clock');
  const greeting = document.getElementById('greeting');
  const paragraph = document.getElementById('intro-text');

  // 🍔 Toggle Menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      }
    });
  }

  // 🕒 UK Clock
  function updateUKClock() {
    const now = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    if (clock) clock.textContent = now;
  }
  setInterval(updateUKClock, 1000);
  updateUKClock();

  // 🌤 Dynamic Greeting
  if (greeting) {
    const hours = new Date().getHours();
    let text = 'Welcome to My Dev Journey 🌸';
    if (hours < 12) text = 'Good Morning! 🌞';
    else if (hours < 18) text = 'Good Afternoon! ☕';
    else text = 'Good Evening! 🌙';
    greeting.textContent = text;
  }

  // 💬 Typewriter Effect
  if (paragraph) {
    const text = paragraph.textContent;
    paragraph.textContent = '';
    let i = 0;
    (function type() {
      if (i < text.length) {
        paragraph.textContent += text.charAt(i);
        i++;
        setTimeout(type, 70);
      }
    })();
  }

  // ✨ Floating Emojis
  function spawnEmoji() {
    if (!emojiContainer) return;
    const emojis = ['💻', '🌸', '🚀', '✨', '🧠', '💡', '🎨'];
    const emoji = document.createElement('div');
    emoji.className = 'float-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = 3 + Math.random() * 3 + 's';
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
  }
  setInterval(spawnEmoji, 1500);

  // 🎉 Fun Button
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      greetBtn.classList.add('clicked');
      greetBtn.textContent = '✨ Magic! ✨';
      setTimeout(() => {
        greetBtn.textContent = 'Do you press?';
        greetBtn.classList.remove('clicked');
      }, 1500);
    });
  }

  // 🐍 Python Interactive Quiz
  const quizData = [
    {
      question: "What is the output of print(2 ** 3)?",
      options: ["5", "6", "8", "9"],
      correct: "8"
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "def", "function", "lambda"],
      correct: "def"
    },
    {
      question: "What data type is the result of: 3 / 2 ?",
      options: ["int", "float", "str", "bool"],
      correct: "float"
    },
    {
      question: "How do you insert COMMENTS in Python code?",
      options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
      correct: "# comment"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizContainer = document.getElementById("quiz-container");
  const nextBtn = document.getElementById("next-btn");
  const resultText = document.getElementById("result");

  // Load saved score if exists
  if (localStorage.getItem("pythonQuizScore")) {
    score = parseInt(localStorage.getItem("pythonQuizScore"));
  }

  function showQuestion() {
    const q = quizData[currentQuestion];
    quizContainer.innerHTML = `
      <div class="quiz-question fade">
        <p><strong>${currentQuestion + 1}. ${q.question}</strong></p>
        ${q.options
          .map(
            opt => `
          <label class="quiz-option">
            <input type="radio" name="answer" value="${opt}"> ${opt}
          </label>`
          )
          .join("")}
      </div>
    `;
  }

  function showConfetti() {
    const colors = ['#8b5cf6', '#a78bfa', '#facc15', '#f472b6', '#60a5fa'];
    for (let i = 0; i < 50; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.style.position = 'fixed';
      conf.style.width = '8px';
      conf.style.height = '8px';
      conf.style.background = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = Math.random() * 100 + 'vw';
      conf.style.top = '-10px';
      conf.style.opacity = 0.8;
      conf.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 5000);
    }
  }

  function showResult() {
    quizContainer.innerHTML = `
      <h3>🎉 Quiz Complete!</h3>
      <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong>.</p>
      <button id="retry-btn" class="fun-btn">Try Again</button>
    `;
    nextBtn.style.display = "none";
    localStorage.setItem("pythonQuizScore", score);

    if (score >= 3) showConfetti();

    const retryBtn = document.getElementById("retry-btn");
    retryBtn.addEventListener("click", () => {
      localStorage.removeItem("pythonQuizScore");
      currentQuestion = 0;
      score = 0;
      nextBtn.style.display = "inline-block";
      showQuestion();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const selected = document.querySelector('input[name="answer"]:checked');
      if (!selected) {
        resultText.textContent = "⚠️ Please select an answer before continuing!";
        resultText.style.color = "#ff6b6b";
        return;
      }

      if (selected.value === quizData[currentQuestion].correct) {
        score++;
      }

      resultText.textContent = "";
      currentQuestion++;

      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showResult();
      }
    });
  }

  // Initialize first question
  if (quizContainer) {
    showQuestion();
  }
});
document.getElementById("result").addEventListener("click", (e) => {
  if (e.target.id === "retry-btn") {
    score = 0;
    currentQuestion = 0;
    showQuestion();
    document.getElementById("result").innerHTML = "";
  }
});
