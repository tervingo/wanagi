const photos = [
  { file: '1_de_pequeños.JPG', alt: 'De pequeños', caption: 'De pequeños' },
  { file: '2_wmtm.JPG', alt: 'Los cuatro', caption: 'Los cuatro' },
  { file: '3_w&carmen.JPG', alt: 'Con Carmen', caption: 'Con Carmen' },
  { file: '4_w&guio.JPG', alt: 'Con Guio', caption: 'Con Guio' },
  { file: '5_todos.JPG', alt: 'Todos juntos ', caption: 'Todos juntos ' },
  { file: '6_w&felisa.JPG', alt: 'Con Felisa', caption: 'Con Felisa' },
  { file: '7_wm&tere.JPG', alt: 'Los tres', caption: 'Los tres' },
  { file: '8_w_villavelayo.JPG', alt: 'En Villavelayo', caption: 'En Villavelayo' },
  { file: '9_w&diego.JPG', alt: 'Con Diego', caption: 'Con Diego' },
  { file: '10_Wanagy_y_Tere.JPG', alt: 'Con Tere', caption: 'Con Tere' }
];

const slidesContainer = document.querySelector('.slides');
slidesContainer.innerHTML = photos.map((photo, index) => `
  <figure class="slide${index === 0 ? ' is-active' : ''}">
    <img src="fotos/${photo.file}" alt="${photo.alt}" loading="${index === 0 ? 'eager' : 'lazy'}">
    <figcaption><span>${String(index + 1).padStart(2, '0')}</span> ${photo.caption}</figcaption>
  </figure>
`).join('');

const slides = [...slidesContainer.querySelectorAll('.slide')];
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