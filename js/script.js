// ============================================
// Mobile Navigation Toggle
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.style.display = 'none';
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
});

// ============================================
// Contact Form Submission
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !service || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `Hello,%20I'm%20interested%20in%20${service}%20course.%0AName:%20${name}%0AEmail:%20${email}%0APhone:%20${phone}%0AMessage:%20${message}`;
        const whatsappUrl = `https://wa.me/251923866562?text=${whatsappMessage}`;

        // Show success message
        alert('Thank you! Your message has been sent. We will contact you soon.');

        // Optionally open WhatsApp
        // window.open(whatsappUrl, '_blank');

        // Reset form
        contactForm.reset();
    });
}

// ============================================
// Smooth Scrolling for anchor links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Add animation on scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and service items
const cards = document.querySelectorAll('.card, .service-item, .team-member, .faq-item');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// Counter Animation
// ============================================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };

    updateCount();
}

// Animate stats when in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = document.querySelectorAll('.stat-item h4');
                statItems.forEach(item => {
                    const number = parseInt(item.textContent);
                    animateCounter(item, number);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ============================================
// Scroll to Top Button
// ============================================

const scrollButton = document.createElement('button');
scrollButton.textContent = '↑';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #ffd700;
    color: #0a1f44;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    display: none;
    z-index: 99;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Mobile Navigation Styling
// ============================================

const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #0a1f44;
            flex-direction: column;
            gap: 0;
            padding: 1rem 0;
        }

        .nav-links li {
            text-align: center;
            border-bottom: 1px solid #333;
        }

        .nav-links a {
            display: block;
            padding: 1rem;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(style);

console.log('One Online Services website loaded successfully!');