const siteCards = document.querySelectorAll(
    ".product-card, .about-card, .home-logo-card, .certification-card, .company-contact-card, .feedback-form, .service-card, .services-support, .team-card"
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

siteCards.forEach((card, index) => {
    card.classList.add("site-card-effect");

    if (prefersReducedMotion) {
        card.classList.add("site-card-visible");
        return;
    }

    window.setTimeout(() => {
        card.classList.add("site-card-visible");
    }, Math.min(index * 65, 520));
});
