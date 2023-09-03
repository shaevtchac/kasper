import { Splide } from '@splidejs/splide';

// _____________________________________________________________ carousels _____________________________________________________________
// hero
const splide = new Splide('.splide', {
  arrows: false,
  lazyLoad: true,
  autoplay: true,
  type: 'loop',
  pauseOnHover: true,
  height: '100vh',
  mediaQuery: 'min',
  breakpoints: {
    1280: {
      height: '800px',
    },
  },
});
splide.mount();
// testimonials
const splideTestimonials = new Splide('#testimonial-carousel', {
  arrows: false,
  classes: {
    page: 'splide__pagination__page page-dot',
  },
});
splideTestimonials.mount();
// portfolio moved to portfolio modal gallery

// _______________________________________________________________ menu _______________________________________________________________

// _________ button
const menuButton = document.getElementById('menu-toggle');
const menuItems = document.getElementById('menu-items');
const nav = document.querySelector('nav');
menuButton.addEventListener('click', function () {
  this.classList.toggle('is-active');
  nav.classList.toggle('is-open');
  const ariaExpanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', !ariaExpanded);
  menuItems.classList.toggle('hidden');
});

// ________ observer
const divTrigger = document.createElement('div');
divTrigger.setAttribute('data-menu-trigger', '');
document.body.prepend(divTrigger);

const menuObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      nav.classList.remove('reduced');
    } else {
      nav.classList.add('reduced');
    }
  },
  { rootMargin: `100px 0px 0px 0px` }
);

menuObserver.observe(divTrigger);
menuItems.addEventListener('click', () => {
  menuButton.classList.remove('is-active');
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', false);
  menuItems.classList.add('hidden');
});

// _______________________________________________________________ animations _______________________________________________________________

const animatedElements = document.querySelectorAll('[data-animation]');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const {
      animation,
      duration = '500ms',
      'timing-function': timingFunction = 'ease-in',
      delay = '0ms',
      'iteration-count': iterationCount = '1',
      direction = 'normal',
      'fill-mode': fillMode = 'backwards',
    } = entry.target.dataset;
    if (entry.isIntersecting) {
      entry.target.style.animation = `${animation} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode}`;
    } else {
      entry.target.style.animation = 'none';
    }
  });
});

animatedElements.forEach((element) => {
  animationObserver.observe(element);
});

// __________________________________________________ image filter __________________________________________________

const buttonAll = document.getElementById('btnAll');
const buttonApp = document.getElementById('btnApp');
const buttonPhoto = document.getElementById('btnPhoto');
const buttonWeb = document.getElementById('btnWeb');
const buttonPrint = document.getElementById('btnPrint');

const imageGallery = document.querySelectorAll('[data-filter]');
let currentFilter = 'all';

function applyFilter(filter) {
  currentFilter = filter;
  imageGallery.forEach((image) => {
    if (filter === 'all' || filter === image.dataset.filter) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });
}
buttonAll.addEventListener('click', () => applyFilter('all'));
buttonApp.addEventListener('click', () => applyFilter('app'));
buttonPhoto.addEventListener('click', () => applyFilter('photo'));
buttonWeb.addEventListener('click', () => applyFilter('web'));
buttonPrint.addEventListener('click', () => applyFilter('print'));

// _______________________________________________________ portfolio modal gallery _______________________________________________________

const modalDlg = document.getElementById('portfolioModal');
const modalDlgCloseButton = document.getElementById('porfolioDlgClose');
const porfolioCarouselList = document.getElementById('portfolioCarouselList');
const splidePortfolio = new Splide('#portfolioCarousel');

modalDlgCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  splidePortfolio.destroy();
  modalDlg.close();
});
document.querySelectorAll('.plus-circle').forEach((circle) =>
  circle.addEventListener('click', function () {
    let filteredGallery = Array.from(imageGallery, (div) =>
      currentFilter === 'all' || currentFilter === div.dataset.filter
        ? div.querySelector('.portfolio-image').src
        : null
    );
    filteredGallery = filteredGallery.filter((img) => Boolean(img));

    porfolioCarouselList.innerHTML = '';

    filteredGallery.forEach((imageSrc) => {
      const li = document.createElement('li');
      li.classList = 'splide__slide grid place-items-center';
      const image = document.createElement('img');
      image.src = imageSrc;
      image.classList = 'w-full';
      li.append(image);
      porfolioCarouselList.append(li);
    });
    splidePortfolio.mount();
    modalDlg.showModal();
    splidePortfolio.go(
      filteredGallery.indexOf(this.parentElement.children[2].src)
    );
  })
);
