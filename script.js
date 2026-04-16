// ─── STICKY NAV ───
const header = document.querySelector('.intro-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});


// ─── MOBILE SCROLL ARROWS ───
const scrollUp   = document.getElementById('scrollUp');
const scrollDown = document.getElementById('scrollDown');

if (scrollUp && scrollDown) {
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function getCurrentIndex() {
    const scrollTop = window.scrollY + window.innerHeight / 2;
    let idx = 0;
    sections.forEach((sec, i) => {
      if (sec.offsetTop <= scrollTop) idx = i;
    });
    return idx;
  }

  function updateButtons() {
    const idx = getCurrentIndex();
    scrollUp.disabled   = idx === 0;
    scrollDown.disabled = idx >= sections.length - 1;
  }

  scrollUp.addEventListener('click', () => {
    const idx = getCurrentIndex();
    if (idx > 0) sections[idx - 1].scrollIntoView({ behavior: 'smooth' });
  });

  scrollDown.addEventListener('click', () => {
    const idx = getCurrentIndex();
    if (idx < sections.length - 1) sections[idx + 1].scrollIntoView({ behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateButtons, { passive: true });
  updateButtons();
}


// ─── SCROLL REVEAL ───
const revealElements = document.querySelectorAll(`
  .hero-text,
  .img-container,
  .aboutme-photos,
  .aboutme-text,
  .project-card,
  .other-card,
  .sem-item,
  .other-projects-header,
  .section-title,
  .contact-title,
  .contact-sub,
  .contact-cta,
  .contact-socials
`);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));


// ─── STAGGER CHILDREN (project cards, other cards) ───
document.querySelectorAll('.projects-grid, .other-projects-grid').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

document.querySelectorAll('.sem-timeline').forEach(timeline => {
  [...timeline.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 70}ms`;
  });
});