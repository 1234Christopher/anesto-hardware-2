const clientMarquee = document.querySelector(".client-marquee");
const clientTrack = document.querySelector(".client-logo-track");
const clientGroup = document.querySelector(".client-logo-group");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (clientMarquee && clientTrack && clientGroup && !reducedMotion.matches) {
    const speed = 28;
    let groupWidth = 0;
    let offset = 0;
    let previousTime = 0;
    let paused = false;

    const measureGroup = () => {
        groupWidth = clientGroup.getBoundingClientRect().width;
        if (groupWidth > 0) {
            offset %= groupWidth;
            clientTrack.style.transform = `translate3d(${offset - groupWidth}px, 0, 0)`;
        }
    };

    const animateLogos = (time) => {
        if (groupWidth > 0 && previousTime && !paused) {
            offset = (offset + ((time - previousTime) * speed) / 1000) % groupWidth;
            clientTrack.style.transform = `translate3d(${offset - groupWidth}px, 0, 0)`;
        }

        previousTime = paused ? 0 : time;
        window.requestAnimationFrame(animateLogos);
    };

    new ResizeObserver(measureGroup).observe(clientGroup);
    clientMarquee.addEventListener("mouseenter", () => {
        paused = true;
        previousTime = 0;
    });
    clientMarquee.addEventListener("mouseleave", () => {
        paused = false;
        previousTime = 0;
    });
    clientMarquee.addEventListener("focusin", () => {
        paused = true;
        previousTime = 0;
    });
    clientMarquee.addEventListener("focusout", (event) => {
        if (!clientMarquee.contains(event.relatedTarget)) {
            paused = false;
            previousTime = 0;
        }
    });

    measureGroup();
    window.requestAnimationFrame(animateLogos);
}
