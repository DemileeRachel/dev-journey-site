/* ===========================
   My Dev Journey – Global JS
   (works on Home, About, Projects)
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     ELEMENT SELECTORS
  ============================ */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');
  const themeBtn   = document.getElementById('theme-toggle');
  const clockOut   = document.getElementById('uk-clock');
  const greetingEl = document.getElementById('greetingText');
  const changeName = document.getElementById('changeNameLink');
  const greetBtn   = document.getElementById('greetBtn');

  /* ===========================
     NAVBAR TOGGLE (MOBILE)
  ============================ */
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

  /* ===========================
     CLOCK (UK TIME)
  ============================ */
  function tick() {
    if (!clockOut) return;
    clockOut.textContent = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  }
  tick();
  setInterval(tick, 1000);

  /* ===========================
     THEME TOGGLE (FIXED + LABEL)
  ============================ */
  const THEME_KEY = 'siteTheme';

  function applyTheme(theme) {
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  /* ===========================
     GREETING MESSAGE + NAME
  ============================ */
  function computeGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  function setGreetingLine() {
    const name = localStorage.getItem('visitorName') || '';
    const base = computeGreeting();
    if (greetingEl) {
      greetingEl.innerHTML = `${base}${name ? ', ' + name : ''}! <span id="greeting-emoji" class="emoji">🌸</span>`;
    }
  }

  if (!localStorage.getItem('visitorName')) {
    localStorage.setItem('visitorName', '');
  }

  setGreetingLine();
  setInterval(setGreetingLine, 60000);

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

  /* ===========================
     GREETING EMOJI INTERACTION
  ============================ */
  (function initEmoji() {
    const greetingEmoji = document.getElementById('greeting-emoji');
    if (!greetingEmoji) return;

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
  })();

  /* ===========================
     FLOATING BACKGROUND EMOJIS
  ============================ */
  const emojiContainer = document.getElementById('emoji-container');
  function spawnEmoji() {
    if (!emojiContainer) return;
    const list = document.body.classList.contains('projects')
      ? ['🐾','🐈','😸','🧶','🌌','🐈‍⬛']
      : ['💻','🌸','🚀','✨','🧠','💡','🎨','🐾'];
    const d = document.createElement('div');
    d.className = 'float-emoji';
    d.textContent = list[Math.floor(Math.random() * list.length)];
    d.style.left = Math.random() * 100 + 'vw';
    d.style.animationDuration = 3 + Math.random() * 3 + 's';
    emojiContainer.appendChild(d);
    setTimeout(() => d.remove(), 7000);
  }
  setInterval(spawnEmoji, 1500);

  /* ===========================
     MINI TYPING GAME
  ============================ */
  const tgWrap   = document.getElementById('typing-game');
  const tgWord   = document.getElementById('typing-word');
  const tgInput  = document.getElementById('typing-input');
  const tgStatus = document.getElementById('typing-feedback');

  if (tgWrap && tgWord && tgInput && tgStatus) {
    const words = ['developer','javascript','portfolio','learning','python'];
    let target = words[0];

    function newWord() {
      target = words[Math.floor(Math.random() * words.length)];
      tgWord.textContent = target;
      tgInput.value = '';
      tgStatus.textContent = '';
    }

    newWord();
    tgWrap.classList.add('typing-hidden');

    tgInput.addEventListener('input', () => {
      if (tgInput.value.trim() === target) {
        tgStatus.textContent = '✓ Nice!';
        setTimeout(newWord, 700);
      } else {
        tgStatus.textContent = '';
      }
    });
  }

  /* ===========================
     TOGGLE TYPING GAME VISIBILITY
  ============================ */
  if (greetBtn && tgWrap) {
    greetBtn.addEventListener('click', () => {
      const isVisible = tgWrap.classList.contains('typing-visible');
      tgWrap.classList.toggle('typing-visible');
      tgWrap.classList.toggle('typing-hidden');
      greetBtn.textContent = isVisible ? "Do you press?" : "Hide Challenge";
    });
  }

  /* ===========================
     SKILLS PANEL TOGGLE
  ============================ */
  const skillsPanel  = document.getElementById('skills');
  const skillsToggle = document.getElementById('skillsToggle');

  if (skillsPanel && skillsToggle) {
    skillsToggle.addEventListener('click', () => {
      const collapsed = skillsPanel.classList.toggle('collapsed');
      skillsToggle.textContent = collapsed ? 'Show Skills' : 'Hide Skills';
      skillsToggle.setAttribute('aria-expanded', String(!collapsed));
    });
  }

  /* ===========================
     SQL MINI QUIZ
  ============================ */
  const quizData = [
    { question: "Which SQL keyword is used to retrieve data from a database?", options: ["GET", "SELECT", "FETCH", "SHOW"], correct: "SELECT" },
    { question: "Which clause filters rows returned by a SELECT query?", options: ["ORDER BY", "WHERE", "GROUP BY", "HAVING"], correct: "WHERE" },
    { question: "Which SQL statement is used to add new data into a table?", options: ["ADD", "INSERT INTO", "UPDATE", "APPEND"], correct: "INSERT INTO" },
    { question: "Which command permanently removes a table from the database?", options: ["DELETE FROM", "DROP TABLE", "REMOVE TABLE", "TRUNCATE TABLE"], correct: "DROP TABLE" }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const nextBtn = document.getElementById('next-btn');
  const resultText = document.getElementById('result');
  const progressFill = document.getElementById('quiz-progress');

  if (quizContainer && nextBtn && resultText && progressFill) {
    let qIndex = 0;
    let qScore = 0;

    function drawQuestion() {
      const q = quizData[qIndex];
      quizContainer.innerHTML = `
        <div class="quiz-question fade">
          <p><strong>${qIndex + 1}. ${q.question}</strong></p>
          ${q.options.map(o => `
            <label class="quiz-option">
              <input type="radio" name="answer" value="${o}"> ${o}
            </label>
          `).join('')}
        </div>
      `;
      const percent = (qIndex / quizData.length) * 100;
      progressFill.style.width = percent + '%';
      resultText.textContent = "";
    }

    function showResult() {
      quizContainer.innerHTML = `
        <h3>🎉 Quiz Complete!</h3>
        <p>You scored <strong>${qScore}</strong> / <strong>${quizData.length}</strong>.</p>
        <button id="retry-btn" class="fun-btn">Try Again</button>
      `;
      progressFill.style.width = "100%";
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
      if (qIndex < quizData.length) drawQuestion();
      else showResult();
    });

    drawQuestion();
  }

  /* ===========================
     CAT NAME GENERATOR
  ============================ */
  const catBtn = document.getElementById("catNameBtn");
  const catOut = document.getElementById("catNameOutput");

  if (catBtn && catOut) {
    const prefixes = ["Sir", "Lady", "Captain", "Doctor", "Agent", "Professor", "Chief", "Lord", "Queen", "Count"];
    const names = ["Galaxy Whiskers", "Slimepaw", "Beeclaw", "Suitpaw", "Ivyfur", "Pixel", "Mochi", "Shadow", "Luna", "Ember", "Crystal", "Ripple"];
    const suffixes = [
      "the Brave 🌟",
      "of the Portal 🌀",
      "the Sneaky 👻",
      "of the Ivy 🪴",
      "the Adventurer 🚀",
      "the Dreamer 💤",
      "the Coder 🎮",
      "of Rogue Whiskers 👑",
      "of the Galaxy 🌠",
      "the Fearless 🐾",
      "the Wanderer 🧭"
    ];

    catBtn.addEventListener("click", () => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      catOut.textContent = `${prefix} ${name} ${suffix}`;
    });
  }

  /* ===========================
     ANIMATED TYPING STATUS TEXT
  ============================ */
  (function devStatus() {
    const statusEl = document.getElementById('dev-status');
    if (!statusEl) return;

    const messages = document.body.classList.contains("projects")
      ? ["🐾 Generating cat names...", "🎮 Squaring some numbers...", "🧶 Compiling whiskers...", "🐍 Feeding the Python...", "🪴 Growing new ideas...", "💾 Saving project progress...", "🚀 Launching cat projects...", "✨ Polishing fur textures...", "😺 Debugging pawsitive code..."]
      : ["💻 Debugging...", "🧠 Refactoring...", "🚀 Compiling...", "🪄 Deploying...", "🐾 Feeding the cats...", "✨ Optimizing pixels...", "🌿 Cleaning up code..."];

    let i = 0, j = 0, deleting = false;

    function typeEffect() {
      const msg = messages[i];
      statusEl.textContent = msg.slice(0, j);
      j += deleting ? -1 : 1;

      if (!deleting && j === msg.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
      if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % messages.length;
      }
      setTimeout(typeEffect, deleting ? 40 : 90);
    }

    typeEffect();
  })();

  /* ===========================
     PYSCRIPT RUNTIME HOOK
  ============================ */
  document.addEventListener('py:ready', () => {
    const btn = document.getElementById("squareBtn");
    const out = document.getElementById("output");
    if (!btn || !out || !window.pyscript || !pyscript.interpreter) return;

    try {
      const pyFunc = pyscript.interpreter.globals.get("square_number");
      btn.disabled = false;
      btn.textContent = "Square it!";
      btn.addEventListener("click", () => pyFunc());
    } catch (err) {
      out.textContent = "⚠️ PyScript function not found!";
      console.error(err);
    }
  });

  /* ===========================
     SQL COPY BUTTON ANIMATION (GLOBAL)
  ============================ */
  const copyBtn = document.getElementById("copySQL");
  const sqlOut = document.getElementById("sqlOutput");

  if (copyBtn && sqlOut) {
    copyBtn.addEventListener("click", async () => {
      const text = sqlOut.textContent.trim();
      if (!text) return alert("⚠️ No SQL query to copy!");
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "✅ Copied!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "📋 Copy";
          copyBtn.classList.remove("copied");
        }, 1500);
      } catch {
        alert("❌ Failed to copy. Please copy manually.");
      }
    });
  }

}); // <-- closes DOMContentLoaded correctly
