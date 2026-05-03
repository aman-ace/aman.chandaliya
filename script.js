/* Scroll-reveal animations + small UX niceties.
   Uses IntersectionObserver for smooth, performant entry transitions. */

(function () {
    'use strict';

    // Stagger reveals inside grid containers
    const staggerParents = ['.grid-3', '.featured-list', '.contact-grid', '.research-list'];
    staggerParents.forEach((sel) => {
        document.querySelectorAll(sel).forEach((parent) => {
            Array.from(parent.querySelectorAll(':scope > .reveal')).forEach((el, i) => {
                el.style.setProperty('--reveal-i', i);
            });
        });
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach((el) => io.observe(el));
    } else {
        // Fallback: just show everything
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    // Header shadow on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        // Close menu when clicking a link (mobile)
        nav.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
})();
