/**
 * Template Name: Bootslander
 * Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
 * Updated: Mar 17 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (elements) {
      (all ? elements.forEach(e => e.addEventListener(type, listener)) : elements.addEventListener(type, listener));
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => el.addEventListener('scroll', listener);

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select('#navbar .scrollto', true);
  const updateNavbarLinks = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      navbarlink.classList.toggle('active', position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight));
    });
  };
  window.addEventListener('load', updateNavbarLinks);
  onscroll(document, updateNavbarLinks);

  /**
   * Scroll to an element with header offset
   */
  const scrollto = (el) => {
    const header = select('#header');
    const offset = header.classList.contains('header-scrolled') ? header.offsetHeight : header.offsetHeight - 20;
    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Toggle .header-scrolled class on #header
   */
  const header = select('#header');
  if (header) {
    const handleHeaderScrolled = () => header.classList.toggle('header-scrolled', window.scrollY > 100);
    window.addEventListener('load', handleHeaderScrolled);
    onscroll(document, handleHeaderScrolled);
  }

  /**
   * Back to top button
   */
  const backToTop = select('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => backToTop.classList.toggle('active', window.scrollY > 100);
    window.addEventListener('load', toggleBackToTop);
    onscroll(document, toggleBackToTop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function () {
    const navbar = select('#navbar');
    navbar.classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns activation
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  /**
   * Scroll with offset on links with .scrollto class
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      const navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        const navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Scroll with offset on page load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /**
   * Preloader
   */
  const preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Initiate glightbox
   */
  GLightbox({ selector: '.glightbox' });

  /**
   * Initiate gallery lightbox
   */
  GLightbox({ selector: '.gallery-lightbox' });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})();
