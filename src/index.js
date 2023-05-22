import { Splide } from '@splidejs/splide';

// _____________________________________________________________ carousels _____________________________________________________________

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
const splideTestimonials = new Splide('#testimonial-carousel', {
  arrows: false,
  classes: {
    page: 'splide__pagination__page page-dot',
  },
});
splideTestimonials.mount();

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

function applyFilter(filter) {
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
