/* ======================================= */
/* 0. CSS Variables & Base Styles */
/* ======================================= */

:root {
    /* Color Palette */
    --color-primary-green: #2E7D32; 
    --color-secondary-green: #4CAF50; 
    --color-earth-tone: #8D6E63; 
    --color-light-background: #F9F7F7; 
    --color-white: #FFFFFF;
    --color-text-dark: #333333;
}

/* Base Styles (for brevity, only showing new/modified styles) */
/* ... (existing base styles here) ... */

/* ======================================= */
/* 1. Header and Navigation (New Elements) */
/* ======================================= */

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
}

.header-branding {
    display: flex;
    align-items: center;
    gap: 15px; /* Spacing between logo, language, and settings */
}

/* Language Selector Styles */
.language-selector {
    display: flex;
    gap: 5px;
}

.lang-button {
    background: none;
    border: 1px solid var(--color-earth-tone);
    color: var(--color-text-dark);
    padding: 5px 8px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 700;
    transition: background-color 0.3s, color 0.3s;
}

.lang-button:hover,
.lang-button.active {
    background-color: var(--color-primary-green);
    color: var(--color-white);
    border-color: var(--color-primary-green);
}

/* Settings Toggle Button Style */
.settings-toggle-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--color-text-dark);
}

/* ======================================= */
/* 2. Hero Section (Booking Removal Feature) */
/* ======================================= */

/* CSS class used by JavaScript to hide the booking card */
.quick-booking-card.hidden {
    display: none !important;
}

/* ... (rest of the existing CSS code follows) ... */