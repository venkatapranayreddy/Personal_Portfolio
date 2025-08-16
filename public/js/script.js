// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Resume Download Function
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'assets/_Pranay_Sanivarapu_SDE___1_.pdf'; // Replace with actual resume file path
    link.download = 'Pranay_Sanivarapu_SDE___1_.pdf'; 
    
    // Show alert for now (replace with actual resume file)
    alert('Hit okay to Download the resume');
    
    // Uncomment the line below when you have the actual resume file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Enhanced Navbar scroll behavior with better UX
class NavbarManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.isScrolled = false;
        this.ticking = false;
        this.scrollThreshold = 50;
        this.init();
    }

    init() {
        if (!this.navbar) return;
        
        // Use requestAnimationFrame for better performance
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateNavbar();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        // Listen for theme changes
        this.observeThemeChanges();
        
        // Set initial state
        this.updateNavbar();
    }

    updateNavbar() {
        const scrollY = window.scrollY;
        const shouldBeScrolled = scrollY > this.scrollThreshold;
        
        // Only update if state changed to avoid unnecessary DOM manipulation
        if (shouldBeScrolled !== this.isScrolled) {
            this.isScrolled = shouldBeScrolled;
            this.applyNavbarStyles();
        }
    }

    applyNavbarStyles() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Remove any inline styles to let CSS classes take precedence
        this.navbar.style.background = '';
        this.navbar.style.boxShadow = '';
        
        // Add/remove scrolled class for CSS-based styling
        if (this.isScrolled) {
            this.navbar.classList.add('navbar-scrolled');
        } else {
            this.navbar.classList.remove('navbar-scrolled');
        }
        
        // Apply theme-specific styles only if needed
        if (this.isScrolled) {
            if (isDarkMode) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                this.navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.6)';
                this.navbar.style.backdropFilter = 'blur(20px)';
                this.navbar.style.borderBottom = '1px solid rgba(42, 42, 42, 0.8)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                this.navbar.style.backdropFilter = 'blur(20px)';
                this.navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            }
        } else {
            // Reset to default styles
            if (isDarkMode) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                this.navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
                this.navbar.style.backdropFilter = 'blur(20px)';
                this.navbar.style.borderBottom = '1px solid rgba(42, 42, 42, 0.6)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                this.navbar.style.backdropFilter = 'blur(10px)';
                this.navbar.style.borderBottom = 'none';
            }
        }
    }

    observeThemeChanges() {
        // Watch for theme changes and update navbar accordingly
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    // Theme changed, update navbar styles
                    setTimeout(() => this.applyNavbarStyles(), 50);
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // Public method to force update (useful when theme is toggled)
    forceUpdate() {
        this.updateNavbar();
    }
}

// Initialize navbar manager
document.addEventListener('DOMContentLoaded', () => {
    window.navbarManager = new NavbarManager();
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Skill tags animation on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) translateY(0)';
        });
    });
});

// Timeline animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});

// Social links hover effect
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Certification cards animation
document.addEventListener('DOMContentLoaded', () => {
    const certCards = document.querySelectorAll('.certification-card');
    certCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        cardObserver.observe(card);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Add some delay for better UX
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 