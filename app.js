// Muskan Dental Clinic Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.getElementById('header');
    const headerToggle = document.getElementById('header-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const backToTopBtn = document.getElementById('backToTop');
    const appointmentForm = document.getElementById('appointment-form');

    // Mobile Navigation Toggle - Fixed
    if (headerToggle && nav) {
        headerToggle.addEventListener('click', function(e) {
            e.preventDefault();
            nav.classList.toggle('active');
            headerToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = headerToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) {
                nav.classList.remove('active');
            }
            if (headerToggle) {
                headerToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = headerToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });

    // Back to top functionality - Fixed
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links - Fixed
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId.replace('#', ''));
        });
    });

    // Update active navigation link based on current section
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + (header ? header.offsetHeight : 80) + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Form validation and submission - Fixed
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrorMessages();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Show success message and reset form
                showSuccessMessage();
                appointmentForm.reset();
            }
        });
    }

    // Form validation function - Fixed
    function validateForm() {
        let isValid = true;
        
        // Get form fields
        const fullName = document.getElementById('fullName');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const preferredDate = document.getElementById('preferredDate');
        
        // Validate full name
        if (!fullName || !fullName.value.trim()) {
            showFieldError('fullName', 'Full name is required');
            isValid = false;
        } else if (fullName.value.trim().length < 2) {
            showFieldError('fullName', 'Full name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate phone number
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phone || !phone.value.trim()) {
            showFieldError('phone', 'Phone number is required');
            isValid = false;
        } else if (!phonePattern.test(phone.value.replace(/\s+/g, ''))) {
            showFieldError('phone', 'Please enter a valid 10-digit Indian mobile number');
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.value.trim()) {
            showFieldError('email', 'Email address is required');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate preferred date (optional but if provided, should be future date)
        if (preferredDate && preferredDate.value) {
            const selectedDate = new Date(preferredDate.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFieldError('preferredDate', 'Please select a future date');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Show field error - Fixed
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        if (field) {
            field.style.borderColor = 'var(--color-error)';
            field.focus();
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.style.color = 'var(--color-error)';
        } else {
            // Create error element if it doesn't exist
            const newErrorElement = document.createElement('span');
            newErrorElement.id = fieldId + '-error';
            newErrorElement.className = 'error-message';
            newErrorElement.textContent = message;
            newErrorElement.style.display = 'block';
            newErrorElement.style.color = 'var(--color-error)';
            newErrorElement.style.fontSize = 'var(--font-size-sm)';
            newErrorElement.style.marginTop = 'var(--space-4)';
            
            if (field && field.parentNode) {
                field.parentNode.appendChild(newErrorElement);
            }
        }
    }
    
    // Clear error messages - Fixed
    function clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        const formControls = document.querySelectorAll('.form-control');
        
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
        
        formControls.forEach(control => {
            control.style.borderColor = '';
        });
    }
    
    // Show success message
    function showSuccessMessage() {
        // Create and show a success modal or notification
        const successModal = createSuccessModal();
        document.body.appendChild(successModal);
        
        // Show modal
        setTimeout(() => {
            successModal.classList.add('show');
        }, 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideSuccessModal(successModal);
        }, 5000);
    }
    
    // Create success modal
    function createSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal__content">
                <div class="success-modal__icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Appointment Request Sent!</h3>
                <p>Thank you for choosing Muskan Dental Clinic. We'll contact you soon to confirm your appointment.</p>
                <button class="btn btn--primary" onclick="this.closest('.success-modal').remove()">Close</button>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .success-modal.show {
                opacity: 1;
            }
            
            .success-modal__content {
                background: var(--color-surface);
                padding: var(--space-32);
                border-radius: var(--radius-lg);
                text-align: center;
                max-width: 400px;
                margin: 0 var(--space-16);
                box-shadow: var(--shadow-lg);
                transform: translateY(-20px);
                transition: transform 0.3s ease;
            }
            
            .success-modal.show .success-modal__content {
                transform: translateY(0);
            }
            
            .success-modal__icon {
                font-size: 48px;
                color: var(--color-success);
                margin-bottom: var(--space-16);
            }
            
            .success-modal__content h3 {
                color: var(--color-text);
                margin-bottom: var(--space-16);
            }
            
            .success-modal__content p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-24);
                line-height: 1.6;
            }
        `;
        
        if (!document.querySelector('style[data-success-modal]')) {
            style.setAttribute('data-success-modal', 'true');
            document.head.appendChild(style);
        }
        
        return modal;
    }
    
    // Hide success modal
    function hideSuccessModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }

    // Set minimum date for appointment to tomorrow
    const preferredDateInput = document.getElementById('preferredDate');
    if (preferredDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        preferredDateInput.min = minDate;
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .gallery__item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .service-card, .feature-card, .testimonial-card, .gallery__item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .service-card.animate-in, .feature-card.animate-in, .testimonial-card.animate-in, .gallery__item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Emergency call tracking
    const emergencyLinks = document.querySelectorAll('a[href^="tel:"]');
    emergencyLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track emergency calls (could be used for analytics)
            console.log('Emergency call initiated');
        });
    });

    // Book Appointment button handlers - Fixed
    const bookAppointmentButtons = document.querySelectorAll('button[onclick*="contact"]');
    bookAppointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    });
});

// Global function for scroll to section - Fixed
function scrollToSection(sectionId) {
    const header = document.getElementById('header');
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    } else {
        console.warn(`Section with id "${sectionId}" not found`);
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    const nav = document.getElementById('nav');
    const headerToggle = document.getElementById('header-toggle');
    
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        if (nav) nav.classList.remove('active');
        if (headerToggle) headerToggle.classList.remove('active');
        
        // Reset hamburger menu
        if (headerToggle) {
            const spans = headerToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }
});

// Prevent form submission on Enter key in text inputs (except textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.form) {
        e.preventDefault();
        const submitButton = e.target.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.click();
        }
    }
});

// Add loading state to form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton) {
            form.addEventListener('submit', function() {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Re-enable button after form validation
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }
    }
});