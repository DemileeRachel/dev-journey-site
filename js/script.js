document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // 🍔 Toggle menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }

  // 🕒 Update UK Clock
  function updateUKClock() {
    const now = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    const clock = document.getElementById('uk-clock');
    if (clock) clock.textContent = now;
  }
  setInterval(updateUKClock, 1000);
  updateUKClock();

  // 🌅 Dynamic Greeting
  function updateGreeting() {
    const hours = new Date().getHours();
    let greeting = 'Welcome to My Dev Journey 🌸';
    if (hours < 12) greeting = 'Good Morning, Developer 🌞';
    else if (hours < 18) greeting = 'Good Afternoon, Coder ☕';
    else greeting = 'Good Evening, Dream Builder 🌙';
    document.getElementById('greeting').textContent = greeting;
  }
  updateGreeting();

  // 💬 Typewriter Effect
  function typeWriter(element, text, speed = 80) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }
    typing();
  }
  const paragraph = document.getElementById('intro-text');
  if (paragraph) {
    const text = paragraph.textContent;
    paragraph.textContent = '';
    typeWriter(paragraph, text);
  }

  // 🎈 Floating Emoji Particles
  function spawnEmoji() {
    const emojis = ['💻', '🌸', '🚀', '✨', '🧠'];
    const emoji = document.createElement('div');
    emoji.className = 'float-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    document.getElementById('emoji-container').appendChild(emoji);
    setTimeout(() => emoji.remove(), 6000);
  }
  setInterval(spawnEmoji, 1500);

  // 🎉 Button Click
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      alert('You clicked the magic button — keep building amazing things! 🚀');
    });
  }
});




