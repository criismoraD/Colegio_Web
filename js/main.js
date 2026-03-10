/* ===========================
   Colegio Pequeños Genios — Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Dark Mode Toggle ────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    // ─── Navbar scroll effect ─────────────────────────
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ─── Mobile menu toggle ──────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });

    // ─── Hero Slider ─────────────────────────────────
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.hero__dot');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index, 10));
        });
    });

    let heroInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
    }, 4000);

    // Pause on hover
    const heroSlider = document.getElementById('heroSlider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(heroInterval));
    heroSlider.addEventListener('mouseleave', () => {
        heroInterval = setInterval(() => {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 4000);
    });

    // ─── Scroll Reveal (Intersection Observer) ───────
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── Animated Counters ───────────────────────────
    const statNumbers = document.querySelectorAll('.stat__number[data-target]');

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const start = performance.now();

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString('es-PE');

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach(el => counterObserver.observe(el));

    // ─── Contact Form (demo handler) ─────────────────
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✅ ¡Solicitud enviada!';
        btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });

    // ─── Smooth Scroll ───────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
