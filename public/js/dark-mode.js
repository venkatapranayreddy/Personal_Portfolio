// Dark Mode Functionality
class DarkModeManager {
    constructor() {
        this.isDarkMode = false;
        this.toggleButton = null;
        this.init();
    }

    init() {
        // Check for saved preference or default to light mode
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply initial theme
        this.applyTheme();
        
        // Create and add toggle button to navigation
        this.createToggleButton();
        
        // Add event listeners
        this.addEventListeners();
        
        // Add smooth transition class after initial load
        setTimeout(() => {
            document.body.classList.add('theme-transition-ready');
        }, 100);
    }

    createToggleButton() {
        // Find the navigation container
        const navContainer = document.querySelector('.nav-container');
        if (!navContainer) return;

        // Create toggle button
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'dark-mode-toggle';
        this.toggleButton.setAttribute('aria-label', 'Toggle dark mode');
        this.toggleButton.innerHTML = `
            <i class="fas ${this.isDarkMode ? 'fa-sun' : 'fa-moon'}"></i>
            <span>${this.isDarkMode ? 'Light' : 'Dark'}</span>
        `;

        // Insert button after the hamburger menu
        const hamburger = navContainer.querySelector('.hamburger');
        if (hamburger) {
            hamburger.parentNode.insertBefore(this.toggleButton, hamburger.nextSibling);
        } else {
            // Fallback: add to the end of nav container
            navContainer.appendChild(this.toggleButton);
        }
    }

    addEventListeners() {
        // Toggle button click
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Keyboard shortcut (Ctrl/Cmd + J)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // System preference change detection
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('darkMode')) {
                    this.isDarkMode = e.matches;
                    this.applyTheme();
                }
            });
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.savePreference();
        this.updateToggleButton();
        
        // Add toggle animation
        this.animateToggle();
    }

    applyTheme() {
        const body = document.body;
        
        if (this.isDarkMode) {
            body.classList.add('dark-mode');
            // Add CSS file for dark mode
            this.loadDarkModeCSS();
        } else {
            body.classList.remove('dark-mode');
            // Remove dark mode CSS
            this.removeDarkModeCSS();
        }
    }

    loadDarkModeCSS() {
        // Check if dark mode CSS is already loaded
        if (document.querySelector('link[href*="dark-mode.css"]')) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/dark-mode.css';
        link.id = 'dark-mode-css';
        document.head.appendChild(link);
    }

    removeDarkModeCSS() {
        const darkModeCSS = document.getElementById('dark-mode-css');
        if (darkModeCSS) {
            darkModeCSS.remove();
        }
    }

    savePreference() {
        localStorage.setItem('darkMode', this.isDarkMode.toString());
    }

    updateToggleButton() {
        if (this.toggleButton) {
            const icon = this.toggleButton.querySelector('i');
            const text = this.toggleButton.querySelector('span');
            
            if (icon) {
                icon.className = `fas ${this.isDarkMode ? 'fa-sun' : 'fa-moon'}`;
            }
            
            if (text) {
                text.textContent = this.isDarkMode ? 'Light' : 'Dark';
            }
        }
    }

    animateToggle() {
        if (this.toggleButton) {
            // Add pulse animation
            this.toggleButton.style.animation = 'none';
            this.toggleButton.offsetHeight; // Trigger reflow
            this.toggleButton.style.animation = 'togglePulse 0.6s ease-in-out';
            
            // Remove animation after it completes
            setTimeout(() => {
                this.toggleButton.style.animation = '';
            }, 600);
        }
    }

    // Public method to check current theme
    getCurrentTheme() {
        return this.isDarkMode ? 'dark' : 'light';
    }

    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'dark' && !this.isDarkMode) {
            this.isDarkMode = true;
            this.applyTheme();
            this.savePreference();
            this.updateToggleButton();
        } else if (theme === 'light' && this.isDarkMode) {
            this.isDarkMode = false;
            this.applyTheme();
            this.savePreference();
            this.updateToggleButton();
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeManager = new DarkModeManager();
});

// Add CSS animations for toggle button
const style = document.createElement('style');
style.textContent = `
    @keyframes togglePulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .theme-transition-ready * {
        transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .dark-mode-toggle {
        position: relative;
        overflow: hidden;
    }
    
    .dark-mode-toggle::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }
    
    .dark-mode-toggle:hover::before {
        left: 100%;
    }
    
    /* Smooth page transitions */
    body.dark-mode {
        transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced hover effects for dark mode */
    body.dark-mode .skill-category:hover,
    body.dark-mode .experience-card:hover,
    body.dark-mode .education-card:hover,
    body.dark-mode .certification-card:hover,
    body.dark-mode .project-card:hover,
    body.dark-mode .pb-card:hover,
    body.dark-mode .race-card:hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeManager;
} 