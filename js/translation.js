// ============================================================
//  SHARED TRANSLATION ENGINE
// ============================================================

let currentLang = localStorage.getItem('preferredLang') || 'pl';

function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) 
        ?? (TRANSLATIONS['pl'][key] ?? key);
}

function applyTranslations() {
    const lang = currentLang;
    const strings = TRANSLATIONS[lang];

    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);
    document.title = t('meta.title');

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));

    // Apply text translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        // Special handling for HTML content (e.g., testimonials.rating with <strong> tag)
        if (key === 'testimonials.rating') {
            el.innerHTML = t(key);
        } else {
            el.textContent = t(key);
        }
    });

    // Apply HTML translations
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });

    // Update language buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
}

// Language button event listeners
document.querySelectorAll('.lang-button').forEach(btn => {
    btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        localStorage.setItem('preferredLang', currentLang);
        applyTranslations();
    });
});

// ============================================================
//  UTILITY FUNCTIONS
// ============================================================

// Auto-update copyright year
function initFooterYear() {
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('navigation-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('nav-open');
        });
    }
}

// Initialize all shared functionality
function initPage() {
    applyTranslations();
    initFooterYear();
    initMobileMenu();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
