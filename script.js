// ─── STICKY NAV ───
const header = document.querySelector('.intro-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});


// ─── SETTINGS PANEL ───
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel  = document.getElementById('settingsPanel');
const settingsClose  = document.getElementById('settingsClose');
const settingsReset  = document.getElementById('settingsReset');
const btnLight       = document.getElementById('btnLight');
const btnDark        = document.getElementById('btnDark');
const fontIncrease   = document.getElementById('fontIncrease');
const fontDecrease   = document.getElementById('fontDecrease');
const fontSizeDisplay = document.getElementById('fontSizeDisplay');

const FONT_SIZES = [85, 92, 100, 110, 120];
let fontIndex = 2; // default = 100%

function applyFontSize(index) {
  const size = FONT_SIZES[index];
  document.documentElement.style.fontSize = size + '%';
  fontSizeDisplay.textContent = size + '%';
  fontDecrease.disabled = index === 0;
  fontIncrease.disabled = index === FONT_SIZES.length - 1;
  localStorage.setItem('fontSize', index);
}

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  btnDark.classList.toggle('active', dark);
  btnLight.classList.toggle('active', !dark);
  localStorage.setItem('darkMode', dark);
}

// Toggle panel open/close
settingsToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = settingsPanel.classList.toggle('open');
  settingsPanel.setAttribute('aria-hidden', !isOpen);
});

settingsClose.addEventListener('click', () => {
  settingsPanel.classList.remove('open');
  settingsPanel.setAttribute('aria-hidden', 'true');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!settingsPanel.contains(e.target) && e.target !== settingsToggle) {
    settingsPanel.classList.remove('open');
    settingsPanel.setAttribute('aria-hidden', 'true');
  }
});

// Theme buttons
btnLight.addEventListener('click', () => applyTheme(false));
btnDark.addEventListener('click',  () => applyTheme(true));

// Font size buttons
fontIncrease.addEventListener('click', () => {
  if (fontIndex < FONT_SIZES.length - 1) applyFontSize(++fontIndex);
});
fontDecrease.addEventListener('click', () => {
  if (fontIndex > 0) applyFontSize(--fontIndex);
});

// Reset
settingsReset.addEventListener('click', () => {
  fontIndex = 2;
  applyFontSize(fontIndex);
  applyTheme(false);
});

// Load saved preferences
const savedFont = localStorage.getItem('fontSize');
const savedDark = localStorage.getItem('darkMode') === 'true';
if (savedFont !== null) fontIndex = parseInt(savedFont);
applyFontSize(fontIndex);
applyTheme(savedDark);


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