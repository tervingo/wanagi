const photos = [
  { file: 'DSC00020.JPG', alt: 'Familia y amigos reunidos alrededor de una mesa', caption: 'Los primeros brindis' },
  { file: 'DSC00027.JPG', alt: 'Recuerdo compartido entre amigos', caption: 'Días para recordar' },
  { file: 'DSC01899.JPG', alt: 'Wanagi y sus seres queridos', caption: 'La gente que importa' },
  { file: 'IMG_1455.JPG', alt: 'Un instante especial de celebración', caption: 'Instantes compartidos' },
  { file: 'IMG_3251.JPG', alt: 'Una escena entrañable del álbum', caption: 'Todo lo vivido' },
  { file: 'P1010050.JPG', alt: 'Un recuerdo familiar', caption: 'Con los de siempre' },
  { file: 'P1010053.JPG', alt: 'Una celebración en buena compañía', caption: 'La celebración continúa' },
  { file: 'P1020662.JPG', alt: 'Un momento espontáneo entre amigos', caption: 'Sin posar, siendo' },
  { file: 'P1020843.JPG', alt: 'Una imagen luminosa de un recuerdo', caption: 'La luz de aquellos días' },
  { file: 'P1020869.JPG', alt: 'Wanagi disfrutando de un momento especial', caption: 'Y todo lo que queda' }
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