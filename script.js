document.addEventListener('DOMContentLoaded', function() {

    // --- 0. Initialize Lenis for Smooth Scrolling ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Recommend using html scroll-padding-top CSS instead of content offset
        // content: document.querySelector('.content-wrapper') // If needed
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    // --- ADDED: Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add class after scrolling 50px
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- ADDED: Simple Mobile Nav Toggle (Basic - No Closing Logic) ---
    // For a full solution, you'd need to handle closing when clicking links or outside
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // This just toggles visibility. For full mobile menu use requires more CSS/JS
            // For this example, we will just log to console as the CSS hides the menu
            console.log("Mobile toggle clicked - Implement menu display logic if needed.");
            // Example (if CSS is set up for it): navMenu.classList.toggle('active');
             // Example (if CSS is set up for it): navToggle.classList.toggle('active'); // For hamburger animation
        });
    }


    // --- 1. Initialize Splitting.js ---
    Splitting();

    // --- 2. Initialize GSAP Animations ---
    const gsapTimeline = gsap.timeline({ delay: 0.2 }); // Slight delay overall

    // Animate Profile Picture
    gsapTimeline.to(".profile-picture", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
    });

    // Animate Hero Section Headline (stagger character reveal)
    gsapTimeline.from(".headline .char", {
        opacity: 0,
        y: 30,
        filter: 'blur(5px)',
        stagger: 0.04,
        ease: "power3.out",
    }, "-=0.7"); // Start slightly after profile pic starts animating

    // Animate Tagline (fade in and slide up)
    gsapTimeline.to(".tagline", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");

    // Animate Scroll Down Hint (fade in)
    gsapTimeline.to(".hero-scroll-down", {
        opacity: 1,
        duration: 1,
        ease: "sine.inOut"
    }, "-=0.3");


    // --- 3. Initialize ScrollReveal.js ---
    const srConfig = (delay = 200, viewFactor = 0.25) => ({
        origin: 'bottom', distance: '30px', duration: 800, delay,
        opacity: 0, scale: 0.95,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        viewFactor, mobile: true, reset: false
    });

    const sr = ScrollReveal();
    sr.reveal('.section-title', srConfig(100));
    sr.reveal('.about-text', srConfig(200));
    sr.reveal('.reveal-fade-up', { ...srConfig(100), interval: 100, distance: '50px' });
    sr.reveal('.portfolio-slider', srConfig(200));
    sr.reveal('.contact-link', { ...srConfig(100), interval: 150, distance: '40px', scale: 1 });


    // --- 4. Initialize Swiper.js (Keep as is) ---
    const swiper = new Swiper('.portfolio-slider', {
        direction: 'horizontal', loop: true, slidesPerView: 1, spaceBetween: 30,
        grabCursor: true,
        breakpoints: { 768: { slidesPerView: 2, spaceBetween: 40 } },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        a11y: { prevSlideMessage: 'Previous slide', nextSlideMessage: 'Next slide' },
    });


    // --- 5. Footer Year (Keep as is) ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    console.log("Apollo's Portfolio Script Initialized! (v2: Navbar, Profile Pic, B&W)");

}); // End DOMContentLoaded