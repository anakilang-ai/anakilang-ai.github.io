const nav = document.getElementById('navbarSupportedContent');
const btn = document.querySelector('.custom_menuBtn');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  nav.classList.toggle('lg_nav-toggle');
  btn.classList.toggle('menu_btn-style');
});

function getCurrentYear() {
  const d = new Date();
  const currentYear = d.getFullYear();
  const displayDate = document.getElementById('displayDate');
  displayDate.textContent = currentYear;
}

getCurrentYear();