const navButtons = document.querySelectorAll('.nav-button');
const sections = document.querySelectorAll('.page-section');
const heroLinks = document.querySelectorAll('.hero-link');
const heartField = document.querySelector('.heart-field');
const music = document.querySelector('#background-music');
const musicToggle = document.querySelector('.music-toggle');
const musicStatus = document.querySelector('.music-status');
const loveGate = document.querySelector('#love-gate');
const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const heartSymbols = ['💖', '💗', '❤️', '💕'];

function moveNoButton() {
  noButton.classList.add('is-running');

  const padding = 16;
  const viewport = window.visualViewport;
  const viewportWidth = Math.min(document.documentElement.clientWidth, window.innerWidth, viewport?.width || Infinity);
  const viewportHeight = Math.min(document.documentElement.clientHeight, window.innerHeight, viewport?.height || Infinity);
  const maxX = Math.max(padding, viewportWidth - noButton.offsetWidth - padding);
  const maxY = Math.max(padding, viewportHeight - noButton.offsetHeight - padding);
  const previousX = Number.parseFloat(noButton.style.left) || 0;
  const previousY = Number.parseFloat(noButton.style.top) || 0;
  let nextX = previousX;
  let nextY = previousY;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    nextX = padding + Math.random() * (maxX - padding);
    nextY = padding + Math.random() * (maxY - padding);

    if (Math.hypot(nextX - previousX, nextY - previousY) > 80) {
      break;
    }
  }

  noButton.style.left = `${Math.min(Math.max(nextX, padding), maxX)}px`;
  noButton.style.top = `${Math.min(Math.max(nextY, padding), maxY)}px`;
}

yesButton.addEventListener('click', () => {
  loveGate.remove();
});

noButton.addEventListener('mouseenter', moveNoButton);
noButton.addEventListener('focus', moveNoButton);
noButton.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') {
    event.preventDefault();
    moveNoButton();
  }
});
noButton.addEventListener('click', moveNoButton);

window.addEventListener('resize', () => {
  if (noButton.classList.contains('is-running')) {
    moveNoButton();
  }
});

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
