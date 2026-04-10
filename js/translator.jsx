import { useState } from "react";

const FILES = [
  { name: "about.html", label: "O nas" },
  { name: "accommodations.html", label: "Noclegi" },
  { name: "experiences.html", label: "Atrakcje" },
];

const SYSTEM_PROMPT = `You are a professional Polish translator specialising in tourism and hospitality websites.

Your task: translate ALL English-language visible text in the provided HTML file into natural, warm, idiomatic Polish — as it would be written by a native Polish speaker for a family agritourism business near Toruń.

STRICT RULES:
1. Return ONLY the full translated HTML — no explanation, no markdown fences, no preamble.
2. Keep ALL HTML tags, attributes, class names, IDs, hrefs, src, CSS, and JavaScript completely unchanged.
3. Translate ONLY text that appears in visible content: text nodes, aria-label values, alt text, title elements, meta description content, and button/link text.
4. Do NOT translate: brand names (Agroturystyka BRZOZA, BRZOZA), place names (Toruń, Vistula), route numbers (Route 91, A1), prices (200 PLN), email/phone placeholders, URLs, CSS property values, JavaScript code, HTML comments.
5. Words already in correct Polish (Noclegi, Kontakt, O nas, Galeria, etc.) stay as-is.
6. The nav link "Home" → "Strona główna", "Experiences" → "Atrakcje", "Testimonials" → "Opinie".
7. Footer "Quick Links" → "Szybkie linki", "Follow Us" → "Obserwuj nas", "All rights reserved" → "Wszelkie prawa zastrzeżone".
8. Use correct Polish diacritics: ą ę ó ś ź ż ć ń ł.
9. Maintain a warm, welcoming, family-friendly tone throughout.`;

const ABOUT_HTML = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>O nas - Agroturystyka BRZOZA | About Us</title>
    <meta name="description" content="Agroturystyka BRZOZA – 3.5 ha farm near Toruń since 1998. Pool, horses, fishing pond, quad bikes, BBQ and more. Family-friendly agritourism.">
    <link rel="canonical" href="https://www.bugajski.pl/about.html">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        .page-hero { background-color: var(--color-primary-green); color: var(--color-white); padding: 3rem 0; text-align: center; }
        .page-hero h1 { color: var(--color-white); font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 0.5rem; }
        .page-hero p  { font-size: 1.1rem; opacity: 0.9; margin: 0; }
        .about-intro { max-width: 780px; margin: var(--spacing-large) auto; text-align: center; }
        .about-intro h2 { color: var(--color-primary-green); margin-bottom: 1rem; }
        .about-intro p  { font-size: 1.05rem; line-height: 1.8; color: var(--color-text-light); }
        .stats-row { display: flex; justify-content: center; gap: var(--spacing-large); flex-wrap: wrap; background-color: var(--color-primary-green); padding: 2.5rem var(--spacing-medium); margin-bottom: var(--spacing-large); }
        .stat-item { text-align: center; color: var(--color-white); }
        .stat-number { font-size: 2.2rem; font-weight: 700; display: block; }
        .stat-label  { font-size: 0.9rem; opacity: 0.85; }
        .attractions-section { padding-bottom: var(--spacing-large); }
        .attractions-section h2 { text-align: center; color: var(--color-primary-green); margin-bottom: var(--spacing-medium); }
        .attractions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-medium); }
        .attraction-card { background: var(--color-white); border-radius: 10px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.07); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .attraction-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .attraction-card img { width: 100%; height: 210px; object-fit: cover; display: block; }
        .attraction-card-body { padding: 1rem 1.25rem 1.25rem; }
        .attraction-card-body h3 { color: var(--color-primary-green); font-size: 1.05rem; margin-bottom: 0.4rem; }
        .attraction-card-body p { color: var(--color-text-light); font-size: 0.92rem; line-height: 1.6; margin: 0; }
        .included-section { background-color: var(--color-light-background); padding: var(--spacing-large) 0; }
        .included-section h2 { text-align: center; color: var(--color-primary-green); margin-bottom: var(--spacing-medium); }
        .included-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; max-width: 900px; margin: 0 auto; }
        .included-item { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.95rem; color: var(--color-text-dark); background: var(--color-white); border-radius: 6px; padding: 0.75rem 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
        .included-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 1px; }
        .cta-banner { background-color: var(--color-secondary-green); color: var(--color-white); text-align: center; padding: 3rem var(--spacing-medium); }
        .cta-banner h2 { color: var(--color-white); margin-bottom: 0.75rem; }
        .cta-banner p  { opacity: 0.92; margin-bottom: 1.5rem; font-size: 1.05rem; }
        .cta-banner .cta-button { background: var(--color-white); color: var(--color-primary-green); }
        .cta-banner .cta-button:hover { background: var(--color-light-background); }
    </style>
</head>
<body>
    <header class="main-header">
        <div class="container header-content">
            <a href="index.html" class="logo">Agroturystyka BRZOZA</a>
            <div class="language-selector">
                <button id="lang-pl" data-lang="pl" class="lang-button active" aria-pressed="true">PL</button>
                <button id="lang-en" data-lang="en" class="lang-button" aria-pressed="false">EN</button>
            </div>
            <nav class="main-nav" aria-label="Main Navigation">
                <button class="menu-toggle" aria-expanded="false" aria-controls="navigation-menu">
                    <span class="hamburger-icon" aria-hidden="true">☰</span>
                    <span class="sr-only">Menu</span>
                </button>
                <ul id="navigation-menu" class="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="accommodations.html">Noclegi</a></li>
                    <li><a href="experiences.html">Experiences</a></li>
                    <li><a href="gallery.html">Galeria</a></li>
                    <li><a href="about.html" aria-current="page">O nas</a></li>
                    <li><a href="testimonials.html">Testimonials</a></li>
                    <li><a href="contact.html" class="nav-cta">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div class="page-hero">
            <div class="container">
                <h1>O nas / About Us</h1>
                <p>Agritourism in the heart of nature &mdash; since 1998</p>
            </div>
        </div>
        <section class="about-intro container">
            <h2>A little corner of nature, 10 km from Toruń</h2>
            <p>Agroturystyka BRZOZA is a family-run farm of <strong>3.5 hectares</strong> tucked into a quiet Vistula River valley village, converted into an agritourism retreat in <strong>1998</strong>. Dense trees and shrubs create a natural buffer from city noise — yet we're just 10 km from Toruń Old Town, right off Route 91 and the A1 motorway. Whether you're here for a weekend family break, a team stay, or a longer working holiday, BRZOZA offers space, fresh air, and plenty to do.</p>
        </section>
        <div class="stats-row">
            <div class="stat-item"><span class="stat-number">1998</span><span class="stat-label">Founded</span></div>
            <div class="stat-item"><span class="stat-number">3.5 ha</span><span class="stat-label">Green space</span></div>
            <div class="stat-item"><span class="stat-number">30</span><span class="stat-label">Guests capacity</span></div>
            <div class="stat-item"><span class="stat-number">10 km</span><span class="stat-label">From Toruń centre</span></div>
        </div>
        <section class="attractions-section container">
            <h2>What's on the Farm</h2>
            <div class="attractions-grid">
                <article class="attraction-card">
                    <img src="images/about-pool-1.webp" alt="Outdoor swimming pool on the farm grounds" loading="lazy">
                    <div class="attraction-card-body"><h3>🏊 Swimming Pool</h3><p>Cool off in our outdoor pool, set among the trees with a wooden deck alongside — perfect for summer afternoons.</p></div>
                </article>
                <article class="attraction-card">
                    <img src="images/about-horses.webp" alt="Two horses on the farm paddock" loading="lazy">
                    <div class="attraction-card-body"><h3>🐴 Horses &amp; Riding</h3><p>Meet our friendly horses up close. We offer riding lessons, horse-drawn carriage rides, sleigh rides, and guided tours on horseback.</p></div>
                </article>
                <article class="attraction-card">
                    <img src="images/about-pond.webp" alt="Fishing pond surrounded by trees" loading="lazy">
                    <div class="attraction-card-body"><h3>🎣 Fishing Pond</h3><p>Our stocked pond is home to carp, grass carp, and sturgeon. Rent a rowing boat or pedalo and enjoy a peaceful day on the water.</p></div>
                </article>
                <article class="attraction-card">
                    <img src="images/about-quads.webp" alt="Children riding quad bikes on a dirt track" loading="lazy">
                    <div class="attraction-card-body"><h3>🏍️ Quad Bikes</h3><p>Kids and adults love our quad bike track — helmets provided, beginner-friendly course laid out with tyres in a wooded setting.</p></div>
                </article>
                <article class="attraction-card">
                    <img src="images/about-bbq.webp" alt="Large outdoor BBQ grill and fire pit" loading="lazy">
                    <div class="attraction-card-body"><h3>🔥 BBQ &amp; Bonfire</h3><p>Host a group BBQ or evening bonfire at our dedicated fire pit, surrounded by birch trees and outdoor seating for large gatherings.</p></div>
                </article>
                <article class="attraction-card">
                    <img src="images/about-bouncy.webp" alt="Large inflatable bouncy castle slide for children" loading="lazy">
                    <div class="attraction-card-body"><h3>🎪 Kids' Attractions</h3><p>Bouncy castles, a basketball court, table football, PlayStation, mini volleyball &amp; football pitch — children are always entertained.</p></div>
                </article>
            </div>
        </section>
        <section class="included-section">
            <div class="container">
                <h2>Everything Included</h2>
                <div class="included-grid">
                    <div class="included-item"><span class="included-icon">📶</span> Free Wi-Fi across the farm</div>
                    <div class="included-item"><span class="included-icon">🅿️</span> Free on-site parking</div>
                    <div class="included-item"><span class="included-icon">🚲</span> Bicycle hire</div>
                    <div class="included-item"><span class="included-icon">🎯</span> Pneumatic shooting range</div>
                    <div class="included-item"><span class="included-icon">⚽</span> Sports fields</div>
                    <div class="included-item"><span class="included-icon">🐄</span> Farm animals to visit</div>
                    <div class="included-item"><span class="included-icon">🛶</span> Boats &amp; pedal boats</div>
                    <div class="included-item"><span class="included-icon">🍳</span> Shared kitchen access</div>
                    <div class="included-item"><span class="included-icon">📺</span> TV in all rooms</div>
                    <div class="included-item"><span class="included-icon">☀️</span> Solar-powered energy</div>
                </div>
            </div>
        </section>
        <div class="cta-banner">
            <div class="container">
                <h2>Ready to visit?</h2>
                <p>Check availability for your dates or get in touch — we're happy to answer any questions.</p>
                <a href="contact.html" class="cta-button">Contact Us &rarr;</a>
            </div>
        </div>
    </main>
    <footer class="main-footer">
        <div class="container footer-grid">
            <div class="footer-col">
                <h4>Agroturystyka BRZOZA</h4>
                <p>Noclegi Toruń. Affordable accommodation and memorable recreational events for groups and families.</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="accommodations.html">Noclegi</a></li>
                    <li><a href="experiences.html">Experiences</a></li>
                    <li><a href="contact.html">Kontakt</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Kontakt</h4>
                <p>Email: <a href="mailto:info@bugajski.pl">info@bugajski.pl</a></p>
                <p>Phone: <a href="tel:+48XXXXXXXXX">+48 XXX XXX XXX</a></p>
            </div>
            <div class="footer-col">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="https://www.facebook.com/people/Agroturystyka-Brzoza/100063647692455/#" target="_blank" rel="noopener noreferrer" aria-label="Visit Agroturystyka BRZOZA on Facebook" class="social-icon facebook-icon">Facebook</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="footer-year"></span> Agroturystyka BRZOZA. All rights reserved. | <a href="https://www.bugajski.pl">www.bugajski.pl</a></p>
        </div>
    </footer>
    <script>document.getElementById('footer-year').textContent = new Date().getFullYear();</script>
</body>
</html>`;

const ACCOMMODATIONS_HTML = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Noclegi - Agroturystyka BRZOZA | Domek Toruń</title>
    <meta name="description" content="Wynajem domku 50m² na agroturystyce pod Toruniem. 2 pokoje, kuchnia, łazienka dla 4-6 osób. 200 PLN/noc. 10 km od centrum Torunia.">
    <link rel="canonical" href="https://www.bugajski.pl/accommodations.html">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="main-header">
        <div class="container header-content">
            <a href="index.html" class="logo">Agroturystyka BRZOZA</a>
            <nav class="main-nav" aria-label="Main Navigation">
                <ul id="navigation-menu" class="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="accommodations.html" aria-current="page">Noclegi</a></li>
                    <li><a href="experiences.html">Experiences</a></li>
                    <li><a href="gallery.html">Galeria</a></li>
                    <li><a href="about.html">O nas</a></li>
                    <li><a href="testimonials.html">Testimonials</a></li>
                    <li><a href="contact.html" class="nav-cta">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div class="page-hero">
            <div class="container">
                <h1>Noclegi / Accommodation</h1>
                <p>A home away from home — 10 km from Toruń Old Town</p>
            </div>
        </div>
        <section class="container">
            <div class="listing-card" aria-labelledby="listing-heading">
                <div class="listing-header">
                    <h2 id="listing-heading">🏡 Entire House &mdash; 2 Rooms, Kitchen &amp; Bathroom &mdash; Up to 6 People</h2>
                    <div class="price-badge">200 PLN / night</div>
                </div>
                <div class="listing-body">
                    <p class="listing-description">A cosy <strong>50 m² cottage</strong> on an agritourism farm, just <strong>10 km from Toruń Old Town</strong> and 200 m from Route 91. The whole house is yours &mdash; two comfortable rooms sleeping up to 6, a fully equipped kitchen, and a private bathroom. Perfect for families, friend groups, or work crews needing a clean, affordable base near Toruń. Free parking on site.</p>
                    <div class="amenities-grid" aria-label="Included amenities">
                        <div class="amenity-item"><span class="amenity-icon">🛏️</span> Bedding included</div>
                        <div class="amenity-item"><span class="amenity-icon">🌡️</span> Heating</div>
                        <div class="amenity-item"><span class="amenity-icon">🚿</span> Hot water</div>
                        <div class="amenity-item"><span class="amenity-icon">📶</span> Wi-Fi</div>
                        <div class="amenity-item"><span class="amenity-icon">🫧</span> Washing machine</div>
                        <div class="amenity-item"><span class="amenity-icon">🌬️</span> Dryer</div>
                        <div class="amenity-item"><span class="amenity-icon">❄️</span> Refrigerator</div>
                        <div class="amenity-item"><span class="amenity-icon">🍳</span> Equipped kitchen</div>
                        <div class="amenity-item"><span class="amenity-icon">🚗</span> Free parking</div>
                        <div class="amenity-item"><span class="amenity-icon">👨‍👩‍👧</span> Family friendly</div>
                    </div>
                    <p style="color: var(--color-text-light); font-size: 0.95rem; margin-bottom: var(--spacing-small);">⚠️ <strong>Minimum stay: 2 nights.</strong> Price is for the entire cottage regardless of guest count (max 6 people).</p>
                    <div class="discount-box">
                        <h3>💰 Long-stay discounts</h3>
                        <ul>
                            <li>Full week <span>&mdash;</span> <strong>30% off</strong></li>
                            <li>Full month <span>&mdash;</span> <strong>50% off</strong></li>
                            <li>Longer stays <span>&mdash; price negotiable</span></li>
                        </ul>
                    </div>
                    <div class="listing-cta">
                        <a href="contact.html" class="cta-button">📩 Book / Enquire</a>
                        <a href="tel:+48XXXXXXXXX" class="secondary-button">📞 Call Us</a>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <footer class="main-footer">
        <div class="container footer-grid">
            <div class="footer-col">
                <h4>Agroturystyka BRZOZA</h4>
                <p>Noclegi Toruń. Affordable accommodation and memorable recreational events for groups and families.</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="accommodations.html">Noclegi</a></li>
                    <li><a href="experiences.html">Experiences</a></li>
                    <li><a href="contact.html">Kontakt</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Kontakt</h4>
                <p>Email: <a href="mailto:info@bugajski.pl">info@bugajski.pl</a></p>
                <p>Phone: <a href="tel:+48XXXXXXXXX">+48 XXX XXX XXX</a></p>
            </div>
            <div class="footer-col">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="https://www.facebook.com/people/Agroturystyka-Brzoza/100063647692455/#" target="_blank" rel="noopener noreferrer" aria-label="Visit Agroturystyka BRZOZA on Facebook" class="social-icon facebook-icon">Facebook</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="footer-year"></span> Agroturystyka BRZOZA. All rights reserved. | <a href="https://www.bugajski.pl">www.bugajski.pl</a></p>
        </div>
    </footer>
    <script>document.getElementById('footer-year').textContent = new Date().getFullYear();</script>
</body>
</html>`;

const EXPERIENCES_HTML = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Experiences - Agroturystyka BRZOZA | Atrakcje Toruń</title>
    <meta name="description" content="Quad bikes, horse riding, fishing, swimming pool, BBQ, bouncy castles and more. Family and group activities at Agroturystyka BRZOZA near Toruń.">
    <link rel="canonical" href="https://www.bugajski.pl/experiences.html">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="main-header">
        <div class="container header-content">
            <a href="index.html" class="logo">Agroturystyka BRZOZA</a>
            <nav class="main-nav" aria-label="Main Navigation">
                <ul id="navigation-menu" class="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="accommodations.html">Noclegi</a></li>
                    <li><a href="experiences.html" aria-current="page">Experiences</a></li>
                    <li><a href="gallery.html">Galeria</a></li>
                    <li><a href="about.html">O nas</a></li>
                    <li><a href="testimonials.html">Testimonials</a></li>
                    <li><a href="contact.html" class="nav-cta">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        <div class="page-hero">
            <div class="container">
                <h1>Experiences &amp; Activities</h1>
                <p>Something for everyone — from toddlers to team-building</p>
            </div>
        </div>
        <nav class="tab-nav" aria-label="Activity categories">
            <button class="tab-btn active" data-tab="outdoor">🌳 Outdoor Activities</button>
            <button class="tab-btn" data-tab="winter">❄️ Winter &amp; Seasonal</button>
            <button class="tab-btn" data-tab="events">🎉 Group Events</button>
            <button class="tab-btn" data-tab="indoor">🏠 Indoor &amp; Rainy Days</button>
        </nav>
        <div class="tab-panel is-active" id="tab-outdoor">
            <section class="container padding-y-large">
                <h2 class="section-title">Outdoor Activities</h2>
                <p class="section-subtitle">With 3.5 hectares of farm and forest, there's always something to explore, ride, fish, or splash around in.</p>
                <div class="activities-grid">
                    <article class="activity-card featured">
                        <img src="images/exp-horses-1.webp" alt="Horse riding lesson on the farm" loading="eager">
                        <div class="activity-card-body">
                            <h3>🐴 Horse Riding &amp; Carriage Tours</h3>
                            <p>Our horses are friendly, well-trained, and perfect for riders of all ages. Choose from riding lessons for beginners, leisurely rides around the farm, horse-drawn carriage excursions, or — in winter — romantic sleigh rides through snowy fields. A highlight for children and adults alike.</p>
                            <a href="contact.html" class="cta-button">Ask about horse riding &rarr;</a>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-pool.webp" alt="Outdoor swimming pool" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🏊 Swimming Pool</h3>
                            <p>Dive into our outdoor pool surrounded by trees and a wooden sunbathing deck. Perfect for hot summer days — the kids will never want to leave.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-fishing.webp" alt="Fishing on the pond" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🎣 Fishing Pond</h3>
                            <p>Cast a line in our well-stocked pond — carp, grass carp, and sturgeon await. Rowing boats and pedalos available. Peaceful, beautiful, and endlessly relaxing.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-quads.webp" alt="Quad biking track" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🏍️ Quad Bikes</h3>
                            <p>Our tyre-marked course through the woods is a favourite for kids and adults. Helmets always provided. Beginner-friendly, with thrills guaranteed.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-bbq.webp" alt="BBQ and bonfire area" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🔥 BBQ &amp; Bonfire</h3>
                            <p>Gather around the fire pit surrounded by birch trees — grill, toast marshmallows, and watch the stars. Available for private groups or as an evening add-on.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-kids.webp" alt="Children playing on bouncy castle" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🎪 Kids' Play Zone</h3>
                            <p>Bouncy castles, basketball court, volleyball, mini football — children have a full day of fun without even asking for a screen.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-shooting.webp" alt="Pneumatic shooting range" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🎯 Shooting Range</h3>
                            <p>Try your aim at our safe, supervised pneumatic shooting range. Great for groups and team competitions — who's the sharpest shot?</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-cycling.webp" alt="Cycling around the farm" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🚲 Cycling</h3>
                            <p>Hire a bike and explore the local countryside. Flat, scenic routes along the Vistula valley make for easy, enjoyable rides for all fitness levels.</p>
                        </div>
                    </article>
                </div>
            </section>
        </div>
        <div class="tab-panel" id="tab-winter">
            <section class="container padding-y-large">
                <h2 class="section-title">Winter &amp; Seasonal Activities</h2>
                <p class="section-subtitle">BRZOZA is beautiful year-round. Winter brings its own magic — snow-covered fields, cosy fires, and sleigh rides.</p>
                <div class="activities-grid">
                    <article class="activity-card">
                        <img src="images/exp-sleigh.webp" alt="Horse-drawn sleigh ride in winter" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🛷 Sleigh Rides</h3>
                            <p>Glide through snowy fields on a traditional horse-drawn sleigh. Warm blankets provided — pure magic for children and couples alike.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-bonfire-winter.webp" alt="Winter bonfire at the farm" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🔥 Winter Bonfires</h3>
                            <p>Nothing beats warming your hands around a roaring fire after a walk in the snow. We set up the fire pit year-round for groups and families.</p>
                        </div>
                    </article>
                    <article class="activity-card">
                        <img src="images/exp-animals-winter.webp" alt="Farm animals in winter" loading="lazy">
                        <div class="activity-card-body">
                            <h3>🐄 Farm Animals</h3>
                            <p>Meet our animals in any season — horses, cows, and more. Children love feeding and interacting with them, and the animals are always happy to meet guests.</p>
                        </div>
                    </article>
                </div>
            </section>
        </div>
        <div class="tab-panel" id="tab-events">
            <section class="container padding-y-large">
                <h2 class="section-title">Group Events &amp; Packages</h2>
                <p class="section-subtitle">Planning a party, retreat, or family gathering? We have space, activities, and flexibility to make it memorable.</p>
                <div class="event-packages">
                    <div class="event-package">
                        <h3>🎂 Birthday Parties</h3>
                        <ul>
                            <li>Outdoor space for up to 30 guests</li>
                            <li>BBQ grill &amp; bonfire area</li>
                            <li>Bouncy castles &amp; kids' activities</li>
                            <li>Quad bikes &amp; shooting range</li>
                            <li>Sports fields</li>
                            <li>Large group capacity</li>
                        </ul>
                        <a href="contact.html" class="cta-button">Enquire &rarr;</a>
                    </div>
                    <div class="event-package">
                        <h3>🏢 Corporate Retreat</h3>
                        <ul>
                            <li>Accommodation for up to 30 people</li>
                            <li>Team activities: quads, fishing, sports</li>
                            <li>BBQ &amp; bonfire evenings</li>
                            <li>Quiet surroundings for focus</li>
                            <li>10 km from Toruń city</li>
                            <li>Flexible multi-day rates</li>
                        </ul>
                        <a href="contact.html" class="cta-button">Enquire &rarr;</a>
                    </div>
                    <div class="event-package">
                        <h3>🔥 BBQ &amp; Bonfire Evening</h3>
                        <ul>
                            <li>Dedicated fire pit &amp; grill area</li>
                            <li>Outdoor seating among birch trees</li>
                            <li>Available for private groups</li>
                            <li>Combine with overnight stay</li>
                            <li>Catering options available</li>
                        </ul>
                        <a href="contact.html" class="cta-button">Enquire &rarr;</a>
                    </div>
                    <div class="event-package">
                        <h3>👨‍👩‍👧 Family Weekend</h3>
                        <ul>
                            <li>Whole cottage rental (50 m²)</li>
                            <li>All outdoor activities included</li>
                            <li>Fishing, pool, horses, quads</li>
                            <li>Kids entertained all day</li>
                            <li>From 200 PLN / night</li>
                            <li>Min. 2 nights</li>
                        </ul>
                        <a href="accommodations.html" class="cta-button">See Accommodation &rarr;</a>
                    </div>
                    <div class="event-package">
                        <h3>🌄 Picnic &amp; Day Visit</h3>
                        <ul>
                            <li>Use of picnic tables &amp; grounds</li>
                            <li>BBQ grill access</li>
                            <li>Activity options available</li>
                            <li>No overnight stay required</li>
                            <li>Great for family days out</li>
                        </ul>
                        <a href="contact.html" class="cta-button">Enquire &rarr;</a>
                    </div>
                </div>
            </section>
        </div>
        <div class="tab-panel" id="tab-indoor">
            <section class="container padding-y-large">
                <h2 class="section-title">Indoor &amp; Rainy Day Activities</h2>
                <p class="section-subtitle">Bad weather? No problem. There's plenty to keep everyone busy inside.</p>
                <div class="activity-list" style="max-width: 800px; margin: 0 auto var(--spacing-large);">
                    <div class="activity-list-item"><span class="icon">🎮</span><div><h4>PlayStation Console</h4><p>Gaming for kids and adults — great for evenings or wet days.</p></div></div>
                    <div class="activity-list-item"><span class="icon">⚽</span><div><h4>Table Football</h4><p>Classic foosball table — always gets a crowd going.</p></div></div>
                    <div class="activity-list-item"><span class="icon">🍳</span><div><h4>Self-Catering Kitchen</h4><p>Fully equipped kitchen — cook together as a family or group.</p></div></div>
                    <div class="activity-list-item"><span class="icon">📶</span><div><h4>Free Wi-Fi</h4><p>Fast Wi-Fi across the farm — stay connected when you need to.</p></div></div>
                    <div class="activity-list-item"><span class="icon">📺</span><div><h4>TV in All Rooms</h4><p>Unwind in the evening with TV in every guest room.</p></div></div>
                    <div class="activity-list-item"><span class="icon">🫧</span><div><h4>Laundry</h4><p>Washing machine and dryer available for longer stays.</p></div></div>
                </div>
                <div style="background: var(--color-light-background); border-radius: 10px; padding: var(--spacing-medium); max-width: 600px; margin: 0 auto; text-align: center;">
                    <p style="font-size: 1.05rem; color: var(--color-text-dark);">💡 <strong>Tip:</strong> Toruń Old Town is just 10 km away — a rainy day is a perfect excuse to explore the Gothic architecture, museums, and the famous gingerbread workshops of one of Poland's most beautiful cities.</p>
                </div>
            </section>
        </div>
        <div class="cta-banner">
            <div class="container">
                <h2>Ready to book your experience?</h2>
                <p>Contact us to check availability or ask about custom group packages.</p>
                <a href="contact.html" class="cta-button">Get in Touch &rarr;</a>
            </div>
        </div>
    </main>
    <footer class="main-footer">
        <div class="container footer-grid">
            <div class="footer-col">
                <h4>Agroturystyka BRZOZA</h4>
                <p>Noclegi Toruń. Affordable accommodation and memorable recreational events for groups and families.</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="accommodations.html">Noclegi</a></li>
                    <li><a href="experiences.html">Experiences</a></li>
                    <li><a href="contact.html">Kontakt</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Kontakt</h4>
                <p>Email: <a href="mailto:info@bugajski.pl">info@bugajski.pl</a></p>
                <p>Phone: <a href="tel:+48XXXXXXXXX">+48 XXX XXX XXX</a></p>
            </div>
            <div class="footer-col">
                <h4>Follow Us</h4>
                <div class="social-links">
                    <a href="https://www.facebook.com/people/Agroturystyka-Brzoza/100063647692455/#" target="_blank" rel="noopener noreferrer" aria-label="Visit Agroturystyka BRZOZA on Facebook" class="social-icon facebook-icon">Facebook</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="footer-year"></span> Agroturystyka BRZOZA. All rights reserved. | <a href="https://www.bugajski.pl">www.bugajski.pl</a></p>
        </div>
    </footer>
    <script>document.getElementById('footer-year').textContent = new Date().getFullYear();</script>
</body>
</html>`;

const ORIGINALS = {
  "about.html": ABOUT_HTML,
  "accommodations.html": ACCOMMODATIONS_HTML,
  "experiences.html": EXPERIENCES_HTML,
};

async function translateFile(filename, html) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Translate this HTML file to Polish. File: ${filename}\n\n${html}`,
        },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "API error");
  return data.content.map((b) => b.text || "").join("");
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [results, setResults] = useState({});
  const [progress, setProgress] = useState({ current: 0, total: 3, label: "" });
  const [error, setError] = useState("");

  async function handleTranslate() {
    setStatus("loading");
    setResults({});
    setError("");
    const translated = {};

    for (let i = 0; i < FILES.length; i++) {
      const file = FILES[i];
      setProgress({ current: i, total: FILES.length, label: file.name });
      try {
        const result = await translateFile(file.name, ORIGINALS[file.name]);
        translated[file.name] = result;
        setResults((prev) => ({ ...prev, [file.name]: result }));
      } catch (e) {
        setError(`Failed on ${file.name}: ${e.message}`);
        setStatus("error");
        return;
      }
    }
    setProgress({ current: 3, total: 3, label: "" });
    setStatus("done");
  }

  const pct = status === "loading"
    ? Math.round((progress.current / progress.total) * 100)
    : status === "done" ? 100 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', serif",
      padding: "2rem",
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        maxWidth: "560px",
        width: "100%",
        padding: "2.5rem 2rem",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌿</div>
          <h1 style={{ fontSize: "1.5rem", color: "#2d6a2d", margin: "0 0 0.4rem" }}>
            Agroturystyka BRZOZA
          </h1>
          <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>
            Tłumaczenie strony na język polski
          </p>
        </div>

        {/* Files list */}
        <div style={{ marginBottom: "1.75rem" }}>
          {FILES.map((f) => {
            const done = !!results[f.name];
            const current = status === "loading" && progress.label === f.name;
            return (
              <div key={f.name} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
                marginBottom: "0.5rem",
                background: done ? "#f0f7f0" : current ? "#fff8e1" : "#fafafa",
                borderRadius: "8px",
                border: `1.5px solid ${done ? "#a5d6a7" : current ? "#ffe082" : "#e0e0e0"}`,
                transition: "all 0.3s",
              }}>
                <div>
                  <div style={{ fontWeight: "600", color: "#333", fontSize: "0.95rem" }}>{f.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "#888" }}>{f.label}</div>
                </div>
                <div style={{ fontSize: "1.2rem" }}>
                  {done ? "✅" : current ? "⏳" : "📄"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        {status === "loading" && (
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{
              height: "6px", background: "#e0e0e0", borderRadius: "99px", overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${pct}%`,
                background: "linear-gradient(90deg, #43a047, #66bb6a)",
                borderRadius: "99px",
                transition: "width 0.5s ease",
              }} />
            </div>
            <p style={{ textAlign: "center", color: "#555", fontSize: "0.85rem", marginTop: "0.5rem" }}>
              Tłumaczenie: <strong>{progress.label}</strong> ({progress.current}/{progress.total})
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div style={{
            background: "#fff3f3", border: "1px solid #f8aaaa", borderRadius: "8px",
            padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#c0392b", fontSize: "0.9rem",
          }}>
            ❌ {error}
          </div>
        )}

        {/* Main button */}
        {status !== "done" && (
          <button
            onClick={handleTranslate}
            disabled={status === "loading"}
            style={{
              width: "100%",
              padding: "1rem",
              background: status === "loading"
                ? "#a5d6a7"
                : "linear-gradient(135deg, #2d6a2d, #43a047)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "1.05rem",
              fontWeight: "700",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.2s",
              boxShadow: status === "loading" ? "none" : "0 4px 14px rgba(67,160,71,0.35)",
            }}
          >
            {status === "loading" ? "⏳ Tłumaczenie w toku..." : "🚀 Przetłumacz na polski — jeden klik!"}
          </button>
        )}

        {/* Download buttons */}
        {status === "done" && (
          <div>
            <div style={{
              textAlign: "center", marginBottom: "1.25rem",
              padding: "1rem", background: "#f0f7f0", borderRadius: "10px",
            }}>
              <div style={{ fontSize: "1.5rem" }}>🎉</div>
              <p style={{ color: "#2d6a2d", fontWeight: "700", margin: "0.25rem 0 0", fontSize: "1rem" }}>
                Gotowe! Wszystkie pliki przetłumaczone.
              </p>
            </div>
            {FILES.map((f) => (
              <button
                key={f.name}
                onClick={() => downloadFile(f.name, results[f.name])}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  width: "100%",
                  padding: "0.85rem 1rem",
                  marginBottom: "0.6rem",
                  background: "white",
                  border: "2px solid #43a047",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#2d6a2d",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7f0"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
              >
                <span style={{ fontSize: "1.1rem" }}>⬇️</span>
                <span>Pobierz <strong>{f.name}</strong></span>
                <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#888" }}>{f.label}</span>
              </button>
            ))}
            <button
              onClick={handleTranslate}
              style={{
                width: "100%", marginTop: "0.75rem", padding: "0.7rem",
                background: "transparent", border: "1.5px solid #ccc",
                borderRadius: "8px", cursor: "pointer", color: "#888",
                fontSize: "0.88rem",
              }}
            >
              🔄 Przetłumacz ponownie
            </button>
          </div>
        )}

        <p style={{
          textAlign: "center", color: "#aaa", fontSize: "0.78rem", marginTop: "1.5rem", marginBottom: 0,
        }}>
          Cały kod HTML pozostaje niezmieniony — tłumaczone są tylko widoczne teksty.
        </p>
      </div>
    </div>
  );
}
