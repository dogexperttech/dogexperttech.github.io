function googleTranslateElementInit() {
  if (typeof google === 'undefined' || !google.translate) return;
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'en,et,ru',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    'google_translate_element',
  );
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    themeToggleBtn.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode',
    );
  }
}

function onThemeToggleClick() {
  const next = document.body.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
}

function initTheme() {
  applyTheme(getPreferredTheme());

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn && themeToggleBtn.dataset.bound !== 'true') {
    themeToggleBtn.dataset.bound = 'true';
    themeToggleBtn.addEventListener('click', onThemeToggleClick);
  }
}

function initHomeTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabButtons.length) return;

  tabButtons.forEach((button) => {
    if (button.dataset.bound === 'true') return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));
      button.classList.add('active');
      const targetId = button.getAttribute('data-tab');
      const targetContent = targetId ? document.getElementById(targetId) : null;
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

function initStreamingAlert() {
  const alertBox = document.getElementById('streaming-alert');
  const closeBtn = alertBox?.querySelector('.closebtn');
  if (!closeBtn || !alertBox || closeBtn.dataset.bound === 'true') return;
  closeBtn.dataset.bound = 'true';
  closeBtn.addEventListener('click', () => {
    alertBox.style.opacity = '0';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 600);
  });
}

function initPageScripts() {
  initTheme();
  initHomeTabs();
  initStreamingAlert();
}

document.addEventListener('DOMContentLoaded', initPageScripts);
document.addEventListener('astro:page-load', initPageScripts);
