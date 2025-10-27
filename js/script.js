document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const greetBtn = document.getElementById('greetBtn');
  const emojiContainer = document.getElementById('emoji-container');
  const clock = document.getElementById('uk-clock');
  const greeting = document.getElementById('greeting');
  const paragraph = document.getElementById('intro-text');

  // 🍔 Toggle Menu (Safari-safe)
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // Close when clicking outside
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

  // 🌤 Greeting
  if (greeting) {
    const hours = new Date().getHours();
    let text = 'Welcome to My Dev Journey 🌸';
    if (hours < 12) text = 'Good Morning, Developer 🌞';
    else if (hours < 18) text = 'Good Afternoon, Coder ☕';
    else text = 'Good Evening, Dream Builder 🌙';
    greeting.textContent = text;
  }

  // 💬 Typewriter
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
});




