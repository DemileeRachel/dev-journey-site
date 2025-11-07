document.addEventListener('DOMContentLoaded', () => {
  /* ===========================
     ELEMENT SELECTORS (safe)
  ============================ */
  const $ = (sel) => document.querySelector(sel);

  const menuToggle = $('#menuToggle');
  const navLinks   = $('#navLinks');
  const themeBtn   = $('#theme-toggle');
  const clockOut   = $('#uk-clock');
  const greetingEl = $('#greetingText');
  const changeName = $('#changeNameLink');
  const greetBtn   = $('#greetBtn');

  /* ===========================
     NAVBAR TOGGLE (MOBILE)
  ============================ */
  try {
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
  } catch (e) { console.warn('Navbar toggle error:', e); }

  /* ===========================
     CLOCK (UK TIME)
  ============================ */
  try {
    function tick() {
      if (!clockOut) return;
      clockOut.textContent = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
    }
    tick();
    setInterval(tick, 1000);
  } catch (e) { console.warn('Clock error:', e); }

  /* ===========================
     THEME TOGGLE
  ============================ */
  try {
    const THEME_KEY = 'siteTheme';
    const applyTheme = (theme) => {
      document.body.classList.toggle('light', theme === 'light');
      document.body.classList.toggle('dark', theme === 'dark');
      if (themeBtn) themeBtn.textContent = theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode';
    };
    applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = document.body.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    }
  } catch (e) { console.warn('Theme error:', e); }

  /* ===========================
     GREETING + NAME
  ============================ */
  try {
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

    // Emoji picker (event delegation so it still works after greeting re-render)
    const emojiSet = ['🌸','💜','🌞','🐍','💻','🚀','🎨','🧠','✨'];
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'greeting-emoji') {
        let next;
        do {
          next = emojiSet[Math.floor(Math.random() * emojiSet.length)];
        } while (next === e.target.textContent);
        e.target.textContent = next;
        localStorage.setItem('greetingEmoji', next);
      }
    });
  } catch (e) { console.warn('Greeting error:', e); }

  /* ===========================
     MINI TYPING GAME
  ============================ */
  try {
    const tgWrap   = $('#typing-game');
    const tgWord   = $('#typing-word');
    const tgInput  = $('#typing-input');
    const tgStatus = $('#typing-feedback');

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
  } catch (e) { console.warn('Typing game error:', e); }

  /* ===========================
     SKILLS PANEL TOGGLE
  ============================ */
  try {
    const skillsPanel  = $('#skills');
    const skillsToggle = $('#skillsToggle');
    if (skillsPanel && skillsToggle) {
      skillsToggle.addEventListener('click', () => {
        const collapsed = skillsPanel.classList.toggle('collapsed');
        skillsToggle.textContent = collapsed ? 'Show Skills' : 'Hide Skills';
        skillsToggle.setAttribute('aria-expanded', String(!collapsed));
      });
    }
  } catch (e) { console.warn('Skills toggle error:', e); }

  /* ===========================
     SQL MINI QUIZ
  ============================ */
  try {
    const quizData = [
      { q: "Which SQL keyword retrieves data?", o: ["GET","SELECT","FETCH","SHOW"], a: "SELECT" },
      { q: "Which clause filters rows?", o: ["ORDER BY","WHERE","GROUP BY","HAVING"], a: "WHERE" },
      { q: "Which adds new data?", o: ["ADD","INSERT INTO","UPDATE","APPEND"], a: "INSERT INTO" },
      { q: "Which deletes an entire table?", o: ["DELETE FROM","DROP TABLE","REMOVE","TRUNCATE"], a: "DROP TABLE" }
    ];

    const quizContainer = $('#quiz-container');
    const nextBtn = $('#next-btn');
    const resultText = $('#result');
    const progressFill = $('#quiz-progress');

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
        if (!picked) { resultText.textContent = "⚠️ Select an answer!"; return; }
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
  } catch (e) { console.warn('Quiz error:', e); }

  /* ===========================
     CAT NAME GENERATOR (1 emoji only at end)
  ============================ */
  try {
    const catBtn = $('#catNameBtn');
    const catOut = $('#catNameOutput');

    if (catBtn && catOut) {
      const prefixes = ["Sir","Lady","Captain","Doctor","Agent","Professor","Chief","Lord","Queen","Count"];
      const names    = ["Galaxy Whiskers","Slimepaw","Beeclaw","Suitpaw","Ivyfur","Pixel","Mochi","Shadow","Luna","Ember","Crystal","Ripple"];
      const suffixes = ["the Brave 🌟","of the Portal 🌀","the Sneaky 👻","of the Ivy 🪴","the Adventurer 🚀","the Dreamer 💤","the Coder 🎮","of Rogue Whiskers 👑","of the Galaxy 🌠","the Wanderer 🧭"];

      // Use event delegation too, in case the button is re-rendered
      const onGen = () => {
        const p = prefixes[Math.floor(Math.random() * prefixes.length)];
        const n = names[Math.floor(Math.random() * names.length)];
        const s = suffixes[Math.floor(Math.random() * suffixes.length)];
        catOut.textContent = `${p} ${n} ${s}`;
      };
      catBtn.addEventListener('click', onGen);
      document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'catNameBtn') onGen();
      });
    }
  } catch (e) { console.warn('Cat name error:', e); }

  /* ===========================
     PYSCRIPT HOOK (robust)
  ============================ */
  try {
    const squareBtn = $('#squareBtn');
    const out = $('#output');

    // Helper to wire button once runtime is ready
    function wirePy() {
      try {
        if (!squareBtn || !window.pyscript || !pyscript.interpreter) return false;
        const pyFunc = pyscript.interpreter.globals.get?.('square_number');
        if (typeof pyFunc !== 'function') return false;
        squareBtn.disabled = false;
        squareBtn.textContent = 'Square it!';
        squareBtn.onclick = () => pyFunc();
        return true;
      } catch (e) {
        return false;
      }
    }

    // If button exists, show loading until runtime is ready
    if (squareBtn) {
      squareBtn.disabled = true;
      squareBtn.textContent = '⏳ Loading PyScript...';

      // Official event when runtime is ready
      document.addEventListener('py:ready', () => {
        if (!wirePy() && out) {
          out.textContent = '⚠️ PyScript ready but function not found.';
        }
      });

      // Fallback polling (in case event is missed due to ordering)
      let tries = 0;
      const poll = setInterval(() => {
        if (wirePy() || ++tries > 40) clearInterval(poll); // ~4s max
      }, 100);
    }
  } catch (e) { console.warn('PyScript hook error:', e); }

  /* ===========================
     DEV STATUS + FLOATING EMOJIS
  ============================ */
  try {
    const statusEl = $('#dev-status');
    const emojiContainer = $('#emoji-container');

    if (statusEl) {
      const messages = document.body.classList.contains('projects')
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

      // Start after a tiny delay to avoid layout races
      requestAnimationFrame(() => {
        statusEl.style.opacity = '0';
        statusEl.style.transition = 'opacity 0.9s ease';
        setTimeout(() => { statusEl.style.opacity = '1'; typeEffect(); }, 200);
      });
    }

    function spawnEmoji() {
      if (!emojiContainer) return;
      const list = document.body.classList.contains('projects')
        ? ["🐾","🐈","😸","🧶","🌌","🐈‍⬛"]
        : ["💻","✨","🚀","💡","🌸","🐾","🎨"];
      const e = document.createElement('div');
      e.className = 'float-emoji';
      e.textContent = list[Math.floor(Math.random() * list.length)];
      e.style.left = Math.random() * 100 + 'vw';
      e.style.animationDuration = 3 + Math.random() * 3 + 's';
      emojiContainer.appendChild(e);
      setTimeout(() => e.remove(), 7000);
    }
    setInterval(spawnEmoji, 1500);
  } catch (e) { console.warn('Dev status / emoji error:', e); }
});
