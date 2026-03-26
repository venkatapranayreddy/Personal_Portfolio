/**
 * Landing Page — Staggered Entrance Choreography
 * taste-skill: MOTION_INTENSITY 6 — fluid spring animations
 */
(function () {
    'use strict';

    const STAGGER_MS = 120;
    const elements = [
        '.landing-eyebrow',
        '.landing-name',
        '.landing-tagline',
        '.landing-status',
        '.choice-card--pro',
        '.choice-card--personal',
        '.landing-footer'
    ];

    function reveal() {
        elements.forEach(function (sel, i) {
            const el = document.querySelector(sel);
            if (!el) return;
            setTimeout(function () {
                el.classList.add('revealed');
            }, i * STAGGER_MS);
        });
    }

    // Magnetic hover on choice cards
    function initMagneticCards() {
        document.querySelectorAll('.choice-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                card.style.transform =
                    'translateX(' + x * 0.04 + 'px) translateY(' + y * 0.04 + 'px)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }

    // Cursor-following subtle glow on landing page
    function initCursorGlow() {
        var landing = document.querySelector('.landing-page');
        if (!landing) return;
        landing.addEventListener('mousemove', function (e) {
            landing.style.setProperty('--cursor-x', e.clientX + 'px');
            landing.style.setProperty('--cursor-y', e.clientY + 'px');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            requestAnimationFrame(function () {
                requestAnimationFrame(reveal);
            });
            initMagneticCards();
            initCursorGlow();
        });
    } else {
        requestAnimationFrame(function () {
            requestAnimationFrame(reveal);
        });
        initMagneticCards();
        initCursorGlow();
    }
})();
