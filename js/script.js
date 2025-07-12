// AG AVOCATS - JavaScript Functionality
// Main script file for interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeCookieBanner();
    initializeContactForm();
    initializeScrollBehavior();
    initializeAccessibility();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            navMenu.setAttribute('aria-hidden', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
                navToggle.focus();
            }
        });
    }
    
    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = menu.classList.contains('active');
                
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.classList.remove('active');
                        }
                    }
                });
                
                // Toggle current dropdown
                menu.classList.toggle('active');
                
                // Update ARIA attributes
                trigger.setAttribute('aria-expanded', menu.classList.contains('active'));
            });
        }
    });
}

// Cookie banner functionality
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.querySelector('.cookie-accept');
    
    if (cookieBanner && cookieAccept) {
        // Check if user has already accepted cookies
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        if (cookiesAccepted) {
            cookieBanner.style.display = 'none';
        }
        
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // In a real application, you would send the data to a server
                showSuccessMessage();
                this.reset();
            }
        });
    }
}

// Contact form Alpine.js data function
function contactForm() {
    return {
        formData: {
            name: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: '',
            consent: false
        },
        isSubmitting: false,
        
        submitForm() {
            this.isSubmitting = true;
            
            // Simulate form submission
            setTimeout(() => {
                this.isSubmitting = false;
                
                // Show success message
                this.showSuccessMessage();
                
                // Reset form
                this.formData = {
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    subject: '',
                    message: '',
                    consent: false
                };
            }, 2000);
        },
        
        showSuccessMessage() {
            const message = document.createElement('div');
            message.className = 'success-message';
            message.innerHTML = `
                <div style="background-color: #38a169; color: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <strong>Message envoyé avec succès!</strong><br>
                    Nous vous recontacterons dans les plus brefs délais.
                </div>
            `;
            
            const form = document.querySelector('.contact-form');
            form.parentNode.insertBefore(message, form);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                message.remove();
            }, 5000);
            
            // Scroll to message
            message.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// Form validation functions
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.required;
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check if required field is empty
    if (required && !value) {
        showFieldError(field, 'Ce champ est obligatoire');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer une adresse email valide');
            return false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer un numéro de téléphone valide');
            return false;
        }
    }
    
    return true;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e53e3e';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    formGroup.appendChild(errorElement);
    field.style.borderColor = '#e53e3e';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div style="background-color: #38a169; color: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center;">
            <strong>Message envoyé avec succès!</strong><br>
            Nous vous recontacterons dans les plus brefs délais.
        </div>
    `;
    
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(message, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
    
    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth' });
}

// Scroll behavior
function initializeScrollBehavior() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll-to-top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '↑';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: var(--accent-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollToTop);
    
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add focus management for dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        const menuItems = menu ? menu.querySelectorAll('a') : [];
        
        if (trigger && menu) {
            // Handle keyboard navigation
            trigger.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    menu.classList.toggle('active');
                    
                    if (menu.classList.contains('active') && menuItems.length > 0) {
                        menuItems[0].focus();
                    }
                }
            });
            
            // Handle menu item navigation
            menuItems.forEach((item, index) => {
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextIndex = (index + 1) % menuItems.length;
                        menuItems[nextIndex].focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
                        menuItems[prevIndex].focus();
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        menu.classList.remove('active');
                        trigger.focus();
                    }
                });
            });
        }
    });
    
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background-color: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.transform = 'translateY(0)';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.transform = 'translateY(-100%)';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Optimize scroll events
    const optimizedScroll = throttle(() => {
        // Scroll-related functionality
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class to header
        const header = document.querySelector('.header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll);
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Export functions for use in other scripts
window.AGAvocats = {
    contactForm,
    validateField,
    validateForm,
    showFieldError,
    clearFieldError,
    showSuccessMessage,
    debounce,
    throttle
};
