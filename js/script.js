console.log("Welcome to my Dev Journey site!");
alert("Hello! Thanks for visiting my site 🚀");
document.getElementById("greetBtn").addEventListener("click", function() {
  alert("You clicked the button — welcome to my dev journey!");
});
// Toggle mobile menu
document.getElementById('menuToggle').addEventListener('click', function() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
});
