// ======================================================
// AWWWARDS-QUALITY 3D EFFECTS
// Premium profile image hover, magnetic cursor,
// 3D tilt cards, scroll-triggered reveals
// ======================================================

(function () {
    'use strict';

    // ======================================================
    // 1. MAGNETIC PROFILE IMAGE — 3D Tilt + Glow on Hover
    // Inspired by Awwwards-winning portfolio interactions
    // ======================================================
    function initProfileHover() {
        const wrapper = document.querySelector('.hero-image');
        const placeholder = document.querySelector('.profile-image-placeholder');
        if (!wrapper || !placeholder) return;

        // Create orbiting ring elements
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'orbit-ring orbit-ring-' + (i + 1);
            wrapper.appendChild(ring);
        }

        // Create floating dot particles around the image
        for (let i = 0; i < 12; i++) {
            const dot = document.createElement('div');
            dot.className = 'float-dot';
            const angle = (i / 12) * Math.PI * 2;
            const radius = 170 + Math.random() * 40;
            dot.style.setProperty('--angle', angle + 'rad');
            dot.style.setProperty('--radius', radius + 'px');
            dot.style.setProperty('--delay', (Math.random() * 4) + 's');
            dot.style.setProperty('--duration', (3 + Math.random() * 3) + 's');
            wrapper.appendChild(dot);
        }

        let rect = wrapper.getBoundingClientRect();
        let isHovering = false;

        wrapper.addEventListener('mouseenter', () => {
            isHovering = true;
            wrapper.classList.add('is-hovered');
        });

        wrapper.addEventListener('mouseleave', () => {
            isHovering = false;
            wrapper.classList.remove('is-hovered');
            // Smooth reset
            placeholder.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            placeholder.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
            setTimeout(() => {
                placeholder.style.transition = '';
            }, 600);
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // max 15deg
            const rotateY = ((x - centerX) / centerX) * 15;

            placeholder.style.transition = 'transform 0.1s ease-out';
            placeholder.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            // Move the glow spot
            wrapper.style.setProperty('--mouse-x', x + 'px');
            wrapper.style.setProperty('--mouse-y', y + 'px');
        });
    }

    // ======================================================
    // 2. VANILLA-TILT — 3D Card Tilt on Hover
    // ======================================================
    function initVanillaTilt() {
        if (typeof VanillaTilt === 'undefined') return;

        const selectors = [
            '.skill-category',
            '.certification-card',
            '.education-card',
            '.timeline-content',
            '.pb-card',
            '.race-card'
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                VanillaTilt.init(el, {
                    max: 6,
                    speed: 400,
                    scale: 1.02,
                    glare: true,
                    'max-glare': 0.12,
                    perspective: 1200,
                    gyroscope: true,
                });
            });
        });
    }

    // ======================================================
    // 3. CSS 3D SCROLL REVEAL ANIMATIONS
    // Cards appear with rotateY perspective as they enter
    // ======================================================
    function init3DScrollReveal() {
        const cards = document.querySelectorAll(
            '.skill-category, .certification-card, .education-card, .timeline-content, .pb-card, .race-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-3d-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        cards.forEach((card, i) => {
            card.classList.add('card-3d-hidden');
            card.style.transitionDelay = `${(i % 4) * 0.08}s`;
            observer.observe(card);
        });
    }

    // ======================================================
    // 4. MAGNETIC BUTTONS — Awwwards-style cursor attraction
    // ======================================================
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .social-link');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                btn.style.transform = 'translate(0, 0)';
                setTimeout(() => { btn.style.transition = ''; }, 400);
            });
        });
    }

    // ======================================================
    // 5. SMOOTH TEXT REVEAL — Hero text animates in
    // ======================================================
    function initTextReveal() {
        const title = document.querySelector('.hero-title');
        const subtitle = document.querySelector('.hero-subtitle');
        const desc = document.querySelector('.hero-description');

        if (!title) return;

        const elements = [title, subtitle, desc].filter(Boolean);
        elements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + i * 0.15}s`;

            // Trigger after a tiny delay so the transition kicks in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // ======================================================
    // 6. PARALLAX SECTION — Sections have subtle parallax
    // ======================================================
    function initParallax() {
        const sections = document.querySelectorAll('.section-title');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const offset = (rect.top / window.innerHeight) * 20;
                section.style.transform = `translateY(${offset}px)`;
            });
        }, { passive: true });
    }

    // ======================================================
    // INITIALIZE
    // ======================================================
    document.addEventListener('DOMContentLoaded', () => {
        initProfileHover();
        initVanillaTilt();
        init3DScrollReveal();
        initMagneticButtons();
        initTextReveal();
        initParallax();
    });
})();
