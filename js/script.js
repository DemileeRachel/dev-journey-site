document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // 🍔 Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 🌐 Highlight active
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop();
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 🎉 Button click
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) greetBtn.addEventListener('click', () => {
    alert('You clicked the button — welcome to my dev journey!');
  });

  // 🕒 Clock
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
});



