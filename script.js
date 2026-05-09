document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderState();
  initMenuTabs();
  initTicker();
});

function initNavigation() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-panel]');

  if (!toggle || !panel) {
    return;
  }

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Apri menu');
    panel.classList.remove('is-open');
    document.body.classList.remove('is-nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Apri menu' : 'Chiudi menu');
    panel.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('is-nav-open', !isOpen);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

function initHeaderState() {
  const header = document.querySelector('[data-header]');

  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

function initMenuTabs() {
  const tabs = Array.from(document.querySelectorAll('[data-menu-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-menu-panel]'));

  if (!tabs.length || !panels.length) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.menuTab;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.menuPanel === target;
        panel.classList.toggle('is-hidden', !isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

function initTicker() {
  const track = document.querySelector('.strip-track');

  if (!track) {
    return;
  }

  track.innerHTML = `${track.innerHTML}${track.innerHTML}`;
}
