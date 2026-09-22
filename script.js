document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        // Prevent scrolling when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar styling on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Animations using IntersectionObserver
    const faders = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            } else {
                entry.target.classList.remove('appear');
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Reviews Slider Cover Flow Logic
    const reviewsSlider = document.getElementById('reviews-slider');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');
    const reviewCards = document.querySelectorAll('.review-card');

    if (reviewsSlider && prevBtn && nextBtn && reviewCards.length > 0) {
        
        // Function to update the active (center) card
        const updateCenterCard = () => {
            const sliderCenter = reviewsSlider.getBoundingClientRect().left + reviewsSlider.clientWidth / 2;
            let closestCard = null;
            let minDistance = Infinity;

            reviewCards.forEach(card => {
                const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
                const distance = Math.abs(sliderCenter - cardCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });

            reviewCards.forEach(card => {
                if (card === closestCard) {
                    card.classList.add('active-review');
                } else {
                    card.classList.remove('active-review');
                }
            });
        };

        // Listen for scroll events to update active card
        reviewsSlider.addEventListener('scroll', () => {
            // Use requestAnimationFrame for smoother performance
            window.requestAnimationFrame(updateCenterCard);
        });

        // Initial update
        updateCenterCard();

        // Calculate scroll amount based on card width
        const getScrollAmount = () => {
            return reviewCards[0].offsetWidth + 15; // 15 is the gap
        };

        prevBtn.addEventListener('click', () => {
            reviewsSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            reviewsSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }
});

function sendWhatsApp(e) {
    e.preventDefault();
    const name = document.getElementById('waName').value;
    const phone = document.getElementById('waPhone').value;
    const message = document.getElementById('waMessage').value;
    const text = `Hello, I'm ${name}.\nPhone: ${phone}\nRequirements: ${message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918086000373?text=${encodedText}`, '_blank');
}
