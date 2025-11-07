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
     THEME TOGGLE
  ============================ */
  const THEME_KEY = 'siteTheme';
  const applyTheme = (theme) => {
    document.body.classList.toggle('light', theme === 'light');
    document.body.classList.toggle('dark', theme === 'dark');
    if (themeBtn)
      themeBtn.textContent = theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
  };
  applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* ===========================
     GREETING MESSAGE
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
    if (greetingEl)
      greetingEl.innerHTML = `${base}${name ? ', ' + name : ''}! <span id="greeting-emoji" class="emoji">🌸</span>`;
  }
  setGreetingLine();

  if (changeName) {
    changeName.addEventListener('click', (e) => {
      e.preventDefault();
      const next = prompt("What's your name?", localStorage.getItem('visitorName') || '');
      if (next !== null) {
        localStorage.setItem('visitorName', next.trim());
        setGreetingLine();
      }
    });
  }

  /* ===========================
     GREETING EMOJI INTERACTION
  ============================ */
  const emojiSet = ['🌸','💜','🌞','🐍','💻','🚀','🎨','🧠','✨'];
  document.addEventListener('click', (e) => {
    if (e.target.id === 'greeting-emoji') {
      let next;
      do {
        next = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      } while (next === e.target.textContent);
      e.target.textContent = next;
      localStorage.setItem('greetingEmoji', next);
    }
  });

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

  if (greetBtn && tgWrap) {
    greetBtn.addEventListener('click', () => {
      const isVisible = tgWrap.classList.contains('typing-visible');
      tgWrap.classList.toggle('typing-visible');
      tgWrap.classList.toggle('typing-hidden');
      greetBtn.textContent = isVisible ? "Do you press?✨" : "Hide Challenge💤";
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
    });
  }

  /* ===========================
     SQL MINI QUIZ
  ============================ */
  const quizData = [
    { q: "Which SQL keyword retrieves data?", o: ["GET","SELECT","FETCH","SHOW"], a: "SELECT" },
    { q: "Which clause filters rows?", o: ["ORDER BY","WHERE","GROUP BY","HAVING"], a: "WHERE" },
    { q: "Which adds new data?", o: ["ADD","INSERT INTO","UPDATE","APPEND"], a: "INSERT INTO" },
    { q: "Which deletes an entire table?", o: ["DELETE FROM","DROP TABLE","REMOVE","TRUNCATE"], a: "DROP TABLE" }
  ];

  const quizContainer = document.getElementById('quiz-container');
  const nextBtn = document.getElementById('next-btn');
  const resultText = document.getElementById('result');
  const progressFill = document.getElementById('quiz-progress');

  if (quizContainer && nextBtn && resultText && progressFill) {
    let i = 0, score = 0;
    function draw() {
      const q = quizData[i];
      quizContainer.innerHTML = `
        <p><strong>${i+1}. ${q.q}</strong></p>
        ${q.o.map(opt => `<label><input type="radio" name="ans" value="${opt}"> ${opt}</label><br>`).join('')}
      `;
      resultText.textContent = "";
      progressFill.style.width = (i / quizData.length) * 100 + "%";
    }
    nextBtn.onclick = () => {
      const picked = document.querySelector('input[name="ans"]:checked');
      if (!picked) return resultText.textContent = "⚠️ Select an answer!";
      if (picked.value === quizData[i].a) score++;
      i++;
      if (i < quizData.length) draw();
      else {
        quizContainer.innerHTML = `<h3>🎉 You scored ${score}/${quizData.length}!</h3>`;
        nextBtn.style.display = "none";
        progressFill.style.width = "100%";
      }
    };
    draw();
  }

  /* ===========================
     CAT NAME GENERATOR
  ============================ */
  const catBtn = document.getElementById("catNameBtn");
  const catOut = document.getElementById("catNameOutput");

  if (catBtn && catOut) {
    const prefixes = ["Sir", "Lady", "Captain", "Doctor", "Agent", "Professor", "Chief", "Lord", "Queen", "Count"];
    const names = ["Galaxy Whiskers", "Slimepaw", "Beeclaw", "Suitpaw", "Ivyfur", "Pixel", "Mochi", "Shadow", "Luna", "Ember"];
    const suffixes = [
      "the Brave 🌟","of the Portal 🌀","the Sneaky 👻","of the Ivy 🪴",
      "the Adventurer 🚀","the Dreamer 💤","the Coder 🎮","of Rogue Whiskers 👑",
      "of the Galaxy 🌠","the Wanderer 🧭"
    ];
    catBtn.addEventListener("click", () => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      catOut.textContent = `${prefix} ${name} ${suffix}`;
    });
  }

  /* ===========================
     PAGE-SPECIFIC DEV STATUS + FLOATING EMOJIS
  ============================ */
  const statusEl = document.getElementById("dev-status");
  const emojiContainer = document.getElementById("emoji-container");

  if (statusEl) {
    const messages = document.body.classList.contains("projects")
      ? ["🐾 Compiling cat magic...","😸 Debugging portals...","💻 Refactoring whiskers...","🚀 Launching new cats...","🌌 Purring through the cosmos..."]
      : ["💻 Debugging...","🧠 Refactoring...","🚀 Compiling...","🐾 Feeding the cats...","✨ Optimizing pixels...","🌿 Cleaning up code..."];
    let msgIndex = 0, charIndex = 0, deleting = false;
    function typeEffect() {
      const current = messages[msgIndex];
      statusEl.textContent = current.slice(0, charIndex);
      charIndex += deleting ? -1 : 1;
      if (!deleting && charIndex === current.length) {
        deleting = true; setTimeout(typeEffect, 1200); return;
      }
      if (deleting && charIndex === 0) {
        deleting = false; msgIndex = (msgIndex + 1) % messages.length;
      }
      setTimeout(typeEffect, deleting ? 40 : 90);
    }
    typeEffect();
  }

  function spawnEmoji() {
    if (!emojiContainer) return;
    const list = document.body.classList.contains("projects")
      ? ["🐾","🐈","😸","🧶","🌌","🐈‍⬛"]
      : ["💻","✨","🚀","💡","🌸","🐾","🎨"];
    const e = document.createElement("div");
    e.className = "float-emoji";
    e.textContent = list[Math.floor(Math.random() * list.length)];
    e.style.left = Math.random() * 100 + "vw";
    e.style.animationDuration = 3 + Math.random() * 3 + "s";
    emojiContainer.appendChild(e);
    setTimeout(() => e.remove(), 7000);
  }
  setInterval(spawnEmoji, 1500);
});
