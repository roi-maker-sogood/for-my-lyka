const navButtons = document.querySelectorAll('.nav-button');
const sections = document.querySelectorAll('.page-section');
const heroLinks = document.querySelectorAll('.hero-link');
const heartField = document.querySelector('.heart-field');
const heartSymbols = ['💖', '💗', '❤️', '💕'];

function showSection(sectionId) {
  sections.forEach(section => {
    section.classList.toggle('active-section', section.id === sectionId);
  });

  navButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.target === sectionId);
  });
}

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';

  const startX = Math.random() * 100;
  const drift = `${Math.random() * 120 - 60}px`;
  const size = `${(Math.random() * 1.4) + 1.2}rem`;
  const duration = `${(Math.random() * 4) + 5}s`;

  heart.style.setProperty('--x', `${startX}%`);
  heart.style.setProperty('--drift', drift);
  heart.style.setProperty('--size', size);
  heart.style.setProperty('--duration', duration);
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heartField.appendChild(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    showSection(button.dataset.target);
  });
});

heroLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showSection(link.dataset.target);
  });
});

showSection('home');

createHeart();
setInterval(createHeart, 450);
