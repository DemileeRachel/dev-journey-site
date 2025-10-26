// js/script.js

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle (safe: checks elements exist)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Greet button (safe)
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', () => {
      alert('You clicked the button — welcome to my dev journey!');
    });
  }

  // Optional: automatically set "active" class on nav links based on current page
  // (This removes the need to manually add class="active" in each HTML file)
  const links = document.querySelectorAll('.nav-links a');
  if (links && links.length) {
    const path = window.location.pathname.split('/').pop(); // e.g. "index.html" or "about.html"
    links.forEach(link => {
      // Remove existing active class
      link.classList.remove('active');
      // If href matches current path, add active
      const href = link.getAttribute('href');
      if (href === path || (href === 'index.html' && path === '')) {
        link.classList.add('active');
      }
    });
  }
});

