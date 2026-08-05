// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the nav link matching the current page
const navLinks = document.querySelectorAll('.main-nav a');
const currentPage = location.pathname.split('/').pop() || 'index.html';

navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href').split('/').pop();
  link.classList.toggle('active', linkPage === currentPage);
});

// Reveal cards and section titles as they scroll into view
const revealTargets = document.querySelectorAll(
  '.teaser-card, .seva-card, .timing-card, .contact-card, .media-card, .stat-card, .testimonial-card, .timeline-item, .section-title, .gallery-item'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));

  // Safety net: never leave content stuck invisible
  setTimeout(() => {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }, 2500);
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Gallery: fallback for missing images, plus lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach((item) => {
  const img = item.querySelector('img');

  img.addEventListener('error', () => {
    item.classList.add('is-empty');
  }, { once: true });

  item.addEventListener('click', () => {
    if (item.classList.contains('is-empty')) return;
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.dataset.caption || '';
    lightbox.classList.add('is-open');
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
