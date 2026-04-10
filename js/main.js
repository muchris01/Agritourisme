// Auto-update copyright year
const yearSpan = document.getElementById('footer-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// i18n translations
const translations = {
    pl: { /* ... paste PL object from index.html ... */ },
    en: { /* ... paste EN object from index.html ... */ }
};

function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang]?.[key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-button').forEach(btn => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    localStorage.setItem('preferredLang', lang);
}

// Initialization
const savedLang = localStorage.getItem('preferredLang');
const browserLang = navigator.language?.startsWith('pl') ? 'pl' : 'en';
applyTranslations(savedLang || browserLang);

// Event Listeners
document.querySelectorAll('.lang-button').forEach(btn => {
    btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
});

// Mobile nav toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('navigation-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('is-open'); // Ensure this matches your CSS class
    });
}