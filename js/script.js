document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const funBtn =
    document.getElementById('funButton') ||
    document.getElementById('greetBtn');
  const emojiContainer = document.getElementById('emoji-container');
  const clock = document.getElementById('uk-clock');
  const greeting = document.getElementById('greeting');
  const paragraph = document.getElementById('intro-text');
  const changeName = document.getElementById('change-name');

  /* =============================
     🍔 NAV MENU TOGGLE (Mobile)
  ============================== */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      }
    });
  }

  /* =============================
     🕒 UK CLOCK (Live)
  ============================== */
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

  /* =============================
     🌤 DYNAMIC GREETING (auto-updating)
  ============================== */
  function updateGreeting() {
    if (!greeting) return;

    const hours = new Date().getHours();
    let text;
    let bg;

    if (hours < 12) {
      text = 'Good Morning! ☀️';
      bg = 'linear-gradient(180deg, #fff8e1, #e0c3fc)';
    } else if (hours < 18) {
      text = 'Good Afternoon! ☕';
      bg = 'linear-gradient(180deg, #e0f7fa, #a5d8ff)';
    } else {
      text = 'Good Evening! 🌙';
      bg = 'linear-gradient(180deg, #cdb4ff, #2c2c54)';
    }

    greeting.textContent = text;
    document.body.style.background = bg;
    document.body.style.transition = 'background 1s ease';
  }

  updateGreeting();
  setInterval(updateGreeting, 60000); // refresh every minute

  /* =============================
     👋 PERSONALIZED VISITOR GREETING
  ============================== */
  if (greeting) {
    let name = localStorage.getItem("visitorName");
    if (!name) {
      name = prompt("What's your name?");
      if (name && name.trim() !== "") {
        localStorage.setItem("visitorName", name.trim());
      }
    }

    if (name) {
      greeting.textContent = `Welcome back, ${name}! 🌸`;
    }

    if (changeName) {
      changeName.addEventListener("click", (e) => {
        e.preventDefault();
        const newName = prompt("Enter your name:");
        if (newName && newName.trim() !== "") {
          localStorage.setItem("visitorName", newName.trim());
          greeting.textContent = `Welcome back, ${newName}! 🌸`;
        }
      });
    }
  }

  /* =============================
     💬 TYPEWRITER EFFECT (Home)
  ============================== */
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

  /* =============================
     ✨ FLOATING EMOJIS
  ============================== */
  function spawnEmoji() {
    if (!emojiContainer) return;
    const emojis = ['💻', '🌸', '🚀', '✨', '🧠', '💡', '🎨', '🐍'];
    const emoji = document.createElement('div');
    emoji.className = 'float-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = 3 + Math.random() * 3 + 's';
    emoji.style.filter = 'none';
    emoji.style.mixBlendMode = 'normal';
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
  }
  setInterval(spawnEmoji, 1500);

  /* =============================
     🎉 FUN INTERACTIVE BUTTON (Home)
  ============================== */
  if (funBtn) {
    funBtn.addEventListener('click', () => {
      funBtn.classList.add('clicked');
      const originalText = funBtn.textContent;
      funBtn.textContent = '✨ Magic! ✨';
      setTimeout(() => {
        funBtn.textContent = originalText || 'Do you press?';
        funBtn.classList.remove('clicked');
      }, 1500);
    });
  }

  /* =============================
     🐍 PYTHON MINI QUIZ (Projects)
  ============================== */
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
      question: "What data type is the result of 3 / 2?",
      options: ["int", "float", "str", "bool"],
      correct: "float"
    },
    {
      question: "How do you insert comments in Python code?",
      options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
      correct: "# comment"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const quizContainer = document.getElementById("quiz-container");
  const nextBtn = document.getElementById("next-btn");
  const resultText = document.getElementById("result");

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
      resultText.textContent = "";
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

      if (selected.value === quizData[currentQuestion].correct) score++;

      resultText.textContent = "";
      currentQuestion++;

      if (currentQuestion < quizData.length) showQuestion();
      else showResult();
    });
  }

  if (quizContainer) {
    showQuestion();
  }
});
