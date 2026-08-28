const navButtons = document.querySelectorAll('.nav-button');
const sections = document.querySelectorAll('.page-section');
const heroLinks = document.querySelectorAll('.hero-link');
const heartField = document.querySelector('.heart-field');
const music = document.querySelector('#background-music');
const musicToggle = document.querySelector('.music-toggle');
const musicStatus = document.querySelector('.music-status');
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

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = '\u23f8';
      musicToggle.setAttribute('aria-label', 'Pause background music');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicStatus.textContent = 'Background music playing';
    } catch {
      musicStatus.textContent = 'Add a licensed music.mp3 file to play music';
    }
  } else {
    music.pause();
    musicToggle.textContent = '\u25b6';
    musicToggle.setAttribute('aria-label', 'Play background music');
    musicToggle.setAttribute('aria-pressed', 'false');
    musicStatus.textContent = 'Background music paused';
  }
});

music.addEventListener('error', () => {
  musicStatus.textContent = 'Add a licensed music.mp3 file to play music';
  musicToggle.disabled = true;
});

music.play().then(() => {
  musicToggle.textContent = '\u23f8';
  musicToggle.setAttribute('aria-label', 'Pause background music');
  musicToggle.setAttribute('aria-pressed', 'true');
  musicStatus.textContent = 'Background music playing';
}).catch(() => {
  musicStatus.textContent = 'Press play to start background music';
});

['click', 'keydown', 'touchstart'].forEach(eventName => {
  document.addEventListener(eventName, () => {
    music.play().catch(() => {});
  }, { once: true });
});

showSection('home');

createHeart();
setInterval(createHeart, 450);
