document.addEventListener('DOMContentLoaded', function () {
  // 🍔 Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 🎉 Greet button
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      alert('You clicked the button — welcome to my dev journey!');
    });
  }

  // 🌐 Highlight active page
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname.split('/').pop();
  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === path || (href === 'index.html' && path === '')) {
      link.classList.add('active');
    }
  });
});

// 🕒 UK Clock Function
function updateUKClock() {
  const options = {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const now = new Date().toLocaleTimeString('en-GB', options);
  const clockElement = document.getElementById('uk-clock');
  if (clockElement) {
    clockElement.textContent = now;
  }
}

setInterval(updateUKClock, 1000);
updateUKClock(); // initial call


