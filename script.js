const slides = [...document.querySelectorAll('.slide')];
const dotsContainer = document.querySelector('.dots');
const counter = document.querySelector('.carousel-counter strong');
const carousel = document.querySelector('.carousel');
let currentIndex = 0;
let timer;

slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (index === 0 ? ' is-active' : '');
  dot.type = 'button';
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Ver foto ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index));
  dotsContainer.append(dot);
});

function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentIndex);
    slide.setAttribute('aria-hidden', slideIndex === currentIndex ? 'false' : 'true');
  });
  [...dotsContainer.children].forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentIndex);
    dot.setAttribute('aria-selected', dotIndex === currentIndex ? 'true' : 'false');
  });
  counter.textContent = String(currentIndex + 1).padStart(2, '0');
}

function startAutoplay() {
  timer = window.setInterval(() => showSlide(currentIndex + 1), 5500);
}

function resetAutoplay() {
  window.clearInterval(timer);
  startAutoplay();
}

document.querySelector('.previous').addEventListener('click', () => { showSlide(currentIndex - 1); resetAutoplay(); });
document.querySelector('.next').addEventListener('click', () => { showSlide(currentIndex + 1); resetAutoplay(); });
carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
carousel.addEventListener('mouseleave', startAutoplay);
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { showSlide(currentIndex - 1); resetAutoplay(); }
  if (event.key === 'ArrowRight') { showSlide(currentIndex + 1); resetAutoplay(); }
});

showSlide(0);
startAutoplay();