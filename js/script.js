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

  /* ===== CLOCK (center) ===== */
  function tick() {
    if (!clockOut) return;
    clockOut.textContent = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  }
  tick();
  setInterval(tick, 1000);

  /* ===== THEME ===== */
  const THEME_KEY = 'siteTheme';
  const applyTheme = (t) => document.body.classList.toggle('dark', t === 'dark');
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  }

  /* ===== NAME + GREETING ===== */
  function computeGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  function setGreetingLine() {
    const name = localStorage.getItem('visitorName') || '';
    const base = computeGreeting();
    greetingEl && (greetingEl.textContent = name ? `${base}, ${name}!` : `${base}!`);
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

  /* ===== Fun button ===== */
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      greetBtn.classList.add('clicked');
      const old = greetBtn.textContent;
      greetBtn.textContent = '✨ Magic! ✨';
      setTimeout(() => { 
        greetBtn.textContent = old; 
        greetBtn.classList.remove('clicked'); 
      }, 1200);
    });
  }

  /* ===== Floating emojis ===== */
  const emojiContainer = document.getElementById('emoji-container');
  function spawnEmoji() {
    if (!emojiContainer) return;
    const list = ['💻','🌸','🚀','✨','🧠','💡','🎨'];
    const d = document.createElement('div');
    d.className = 'float-emoji';
    d.textContent = list[Math.floor(Math.random()*list.length)];
    d.style.left = Math.random()*100 + 'vw';
    d.style.animationDuration = 3 + Math.random()*3 + 's';
    emojiContainer.appendChild(d);
    setTimeout(() => d.remove(), 7000);
  }
  setInterval(spawnEmoji, 1500);

  /* ===== Mini typing game ===== */
  const tgWrap   = document.getElementById('typing-game');
  const tgWord   = document.getElementById('typing-word');
  const tgInput  = document.getElementById('typing-input');
  const tgStatus = document.getElementById('typing-feedback');
  if (tgWrap && tgWord && tgInput && tgStatus) {
    const words = ['developer','javascript','portfolio','learning','python'];
    let target = words[0];
    function newWord() { 
      target = words[Math.floor(Math.random()*words.length)]; 
      tgWord.textContent = target; 
      tgInput.value=''; 
      tgStatus.textContent=''; 
    }
    newWord();
    tgWrap.style.display = 'block';
    tgInput.addEventListener('input', () => {
      if (tgInput.value.trim() === target) { 
        tgStatus.textContent = '✓ Nice!'; 
        setTimeout(newWord, 700); 
      } else { 
        tgStatus.textContent = ''; 
      }
    });
  }

  /* ===== Python Mini Quiz ===== */
  const quizData = [
    { question: "What is the output of print(2 ** 3)?", options: ["5","6","8","9"], correct: "8" },
    { question: "Which keyword defines a function?", options: ["func","def","function","lambda"], correct: "def" },
    { question: "Type of 3 / 2 ?", options: ["int","float","str","bool"], correct: "float" },
    { question: "Python comment starts with…", options: ["//","#","<!--","/*"], correct: "#" }
  ];
  let qIndex = 0, qScore = 0;

  const quizContainer = document.getElementById('quiz-container');
  const nextBtn       = document.getElementById('next-btn');
  const resultText    = document.getElementById('result');
  const progressFill  = document.getElementById('quiz-progress-fill'); // <-- NEW

  function updateProgress() {
    if (!progressFill) return;
    const percent = ((qIndex) / quizData.length) * 100;
    progressFill.style.width = `${percent}%`;
  }

  function drawQuestion() {
    const q = quizData[qIndex];
    quizContainer.innerHTML = `
      <div class="quiz-question fade">
        <p><strong>${qIndex+1}. ${q.question}</strong></p>
        ${q.options.map(o => `
          <label class="quiz-option">
            <input type="radio" name="answer" value="${o}"> ${o}
          </label>
        `).join('')}
      </div>`;
    updateProgress(); // update bar every question
  }

  function showResult() {
    quizContainer.innerHTML = `
      <h3>🎉 Quiz Complete!</h3>
      <p>You scored <strong>${qScore}</strong> out of <strong>${quizData.length}</strong>.</p>
      <button id="retry-btn" class="fun-btn">Try Again</button>
    `;
    if (progressFill) progressFill.style.width = '100%'; // fill bar at end
    if (nextBtn) nextBtn.style.display = 'none';
    const rb = document.getElementById('retry-btn');
    rb && rb.addEventListener('click', () => {
      qIndex = 0; qScore = 0; resultText.textContent = ''; 
      if (nextBtn) nextBtn.style.display = 'inline-block';
      drawQuestion();
    });
  }

  if (quizContainer) {
    if (nextBtn && !nextBtn.classList.contains('fun-btn')) nextBtn.classList.add('fun-btn');
    drawQuestion();
    nextBtn && nextBtn.addEventListener('click', () => {
      const pick = document.querySelector('input[name="answer"]:checked');
      if (!pick) { 
        resultText.textContent = "⚠️ Select an answer first"; 
        resultText.style.color = "#ff6b6b"; 
        return; 
      }
      if (pick.value === quizData[qIndex].correct) qScore++;
      qIndex++;
      resultText.textContent = '';
      (qIndex < quizData.length) ? drawQuestion() : showResult();
    });
  }
});
  /* ===== GREETING EMOJI INTERACTION ===== */
  const greetingEmoji = document.getElementById('greeting-emoji');
  if (greetingEmoji) {
    const emojiSet = ['🌸','💜','🌞','🐍','💻','🚀','🎨','🧠','✨'];
    greetingEmoji.addEventListener('click', () => {
      let current = greetingEmoji.textContent;
      let next;
      do {
        next = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      } while (next === current);
      greetingEmoji.textContent = next;
      greetingEmoji.classList.add('clicked');
      setTimeout(() => greetingEmoji.classList.remove('clicked'), 400);
    });
  }
