// 🌸 My Dev Journey — Unified Script
document.addEventListener('DOMContentLoaded', () => {

  /* ===== ELEMENTS ===== */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');
  const themeBtn   = document.getElementById('theme-toggle');
  const clockOut   = document.getElementById('uk-clock');
  const greetingEl = document.getElementById('greetingText');
  const changeName = document.getElementById('changeNameLink');
  const greetBtn   = document.getElementById('greetBtn');

  /* ===== NAV (mobile) ===== */
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

  /* ===== CLOCK ===== */
  function tick() {
    if (!clockOut) return;
    clockOut.textContent = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  }
  tick();
  setInterval(tick, 1000);

  /* ===== THEME TOGGLE ===== */
  const THEME_KEY = 'siteTheme';
  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
  };
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* ===== GREETING SYSTEM ===== */
  function computeGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  function setGreetingLine() {
    const name = localStorage.getItem('visitorName') || '';
    const base = computeGreeting();
    if (greetingEl)
      greetingEl.innerHTML = `${base}${name ? ', ' + name : ''}! <span id="greeting-emoji" class="emoji">🌸</span>`;
  }

  if (!localStorage.getItem('visitorName')) {
    localStorage.setItem('visitorName', '');
  }
  setGreetingLine();
  setInterval(setGreetingLine, 60 * 1000);

  if (changeName) {
    changeName.addEventListener('click', (e) => {
      e.preventDefault();
      const current = localStorage.getItem('visitorName') || '';
      const next = prompt("What's your name?", current);
      if (next !== null) {
        localStorage.setItem('visitorName', next.trim());
        setGreetingLine();
      }
    });
  }

  /* ===== GREETING EMOJI (Interactive + Persistent) ===== */
  function initEmoji() {
    const greetingEmoji = document.getElementById('greeting-emoji');
    if (greetingEmoji) {
      const emojiSet = ['🌸','💜','🌞','🐍','💻','🚀','🎨','🧠','✨'];
      const savedEmoji = localStorage.getItem('greetingEmoji');
      if (savedEmoji) greetingEmoji.textContent = savedEmoji;

      greetingEmoji.addEventListener('click', () => {
        let next;
        do {
          next = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        } while (next === greetingEmoji.textContent);
        greetingEmoji.textContent = next;
        localStorage.setItem('greetingEmoji', next);
        greetingEmoji.classList.add('clicked');
        setTimeout(() => greetingEmoji.classList.remove('clicked'), 400);
      });
    }
  }
  initEmoji();

  /* ===== MULTI-LINE TYPEWRITER ===== */
  const paragraph = document.getElementById('intro-text');
  if (paragraph) {
    const lines = [
      "Welcome to my journey to being a full-stack developer!",
      "I love creating interactive web projects 💻",
      "Learning new tech one day at a time ⌨️",
      "Let’s build something amazing today 🚀"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typingSpeed = 70;
    const pauseDelay = 1200;

    function typeWriter() {
      const currentLine = lines[lineIndex];

      if (!deleting && charIndex < currentLine.length) {
        paragraph.textContent = currentLine.substring(0, charIndex + 1);
        charIndex++;
      } else if (deleting && charIndex > 0) {
        paragraph.textContent = currentLine.substring(0, charIndex - 1);
        charIndex--;
      } else {
        if (!deleting && charIndex === currentLine.length) {
          deleting = true;
          setTimeout(typeWriter, pauseDelay);
          return;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
        }
      }

      setTimeout(typeWriter, deleting ? typingSpeed / 2 : typingSpeed);
    }

    typeWriter();
  }

  /* ===== FUN BUTTON + TYPING GAME TOGGLE ===== */
  if (greetBtn) {
    const typingGame = document.getElementById('typing-game');
    const tgWord   = document.getElementById('typing-word');
    const tgInput  = document.getElementById('typing-input');
    const tgStatus = document.getElementById('typing-feedback');

    const words = ['developer', 'javascript', 'portfolio', 'learning', 'python'];

    function newWord() {
      const target = words[Math.floor(Math.random() * words.length)];
      tgWord.textContent = target;
      tgInput.value = '';
      tgStatus.textContent = '';
      return target;
    }

    let currentWord = newWord();

    greetBtn.addEventListener('click', () => {
      greetBtn.classList.add('clicked');
      const old = greetBtn.textContent;
      greetBtn.textContent = '✨ Magic! ✨';
      setTimeout(() => {
        greetBtn.textContent = old;
        greetBtn.classList.remove('clicked');
      }, 1000);

      // Toggle typing game visibility
      typingGame.classList.toggle('typing-visible');
      typingGame.classList.toggle('typing-hidden');
    });

    // Typing challenge logic
    if (tgInput) {
      tgInput.addEventListener('input', () => {
        if (tgInput.value.trim() === currentWord) {
          tgStatus.textContent = '✅ Nice!';
          setTimeout(() => {
            currentWord = newWord();
          }, 700);
        } else {
          tgStatus.textContent = '';
        }
      });
    }
  }

  /* ===== FLOATING EMOJIS ===== */
  const emojiContainer = document.getElementById('emoji-container');
  function spawnEmoji() {
    if (!emojiContainer) return;
    const list = ['💻','🌸','🚀','✨','🧠','💡','🎨'];
    const d = document.createElement('div');
    d.className = 'float-emoji';
    d.textContent = list[Math.floor(Math.random() * list.length)];
    d.style.left = Math.random() * 100 + 'vw';
    d.style.animationDuration = 3 + Math.random() * 3 + 's';
    emojiContainer.appendChild(d);
    setTimeout(() => d.remove(), 7000);
  }
  setInterval(spawnEmoji, 1500);

  /* ===== PYTHON MINI QUIZ (Projects Page) ===== */
  const quizData = [
    { question: "What is the output of print(2 ** 3)?", options: ["5", "6", "8", "9"], correct: "8" },
    { question: "Which keyword defines a function?", options: ["func", "def", "function", "lambda"], correct: "def" },
    { question: "Type of 3 / 2 ?", options: ["int", "float", "str", "bool"], correct: "float" },
    { question: "Python comment starts with…", options: ["//", "#", "<!--", "/*"], correct: "#" }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const nextBtn = document.getElementById('next-btn');
  const resultText = document.getElementById('result');

  if (quizContainer && nextBtn && resultText) {
    let qIndex = 0;
    let qScore = 0;

    function drawQuestion() {
      const q = quizData[qIndex];
      quizContainer.innerHTML = `
        <div class="quiz-question">
          <p><strong>${qIndex + 1}. ${q.question}</strong></p>
          ${q.options.map(o => `
            <label class="quiz-option">
              <input type="radio" name="answer" value="${o}"> ${o}
            </label>
          `).join('')}
        </div>`;
    }

    function showResult() {
      quizContainer.innerHTML = `
        <h3>🎉 Quiz Complete!</h3>
        <p>You scored <strong>${qScore}</strong> / <strong>${quizData.length}</strong>.</p>
        <button id="retry-btn" class="fun-btn">Try Again</button>
      `;
      resultText.textContent = "";
      nextBtn.style.display = "none";

      const retry = document.getElementById('retry-btn');
      retry.addEventListener('click', () => {
        qIndex = 0;
        qScore = 0;
        nextBtn.style.display = "inline-block";
        drawQuestion();
      });
    }

    nextBtn.addEventListener('click', () => {
      const picked = document.querySelector('input[name="answer"]:checked');
      if (!picked) {
        resultText.textContent = "⚠️ Select an answer first";
        resultText.style.color = "#ff6b6b";
        return;
      }
      if (picked.value === quizData[qIndex].correct) qScore++;
      qIndex++;
      resultText.textContent = "";
      if (qIndex < quizData.length) drawQuestion();
      else showResult();
    });

    drawQuestion();
  }
});
