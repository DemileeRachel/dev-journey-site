// 🌸 My Dev Journey — JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // --- 🍔 Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // Close menu when a nav link is clicked (for mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }

  // --- 🌐 Highlight Active Page ---
  const links = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop();

  links.forEach(link => {
    link.classList.remove('active');
    if (
      link.getAttribute('href') === currentPage ||
      (currentPage === '' && link.getAttribute('href') === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // --- 🕒 UK Clock ---
  const clockContainer = document.getElementById('uk-clock');

  function updateUKClock() {
    const now = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    if (clockContainer) clockContainer.textContent = now;
  }

  updateUKClock();
  setInterval(updateUKClock, 1000);

  // --- 🎉 Greeting Button ---
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      alert('🌸 You clicked the button — welcome to my Dev Journey!');
    });
  }

  // --- 🌈 Console Message (for debugging or fun) ---
  console.log('%cHello Developer! 🌸', 'color: #ff69b4; font-weight: bold;');
});



