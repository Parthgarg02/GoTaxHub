// GoTaxHub - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initMobileMenu();
    initPricingToggle();
    initFAQ();
    initContactForm();
    initSmoothScrolling();
    initServiceCardInteractions();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            console.log('Navigating to:', targetId); // Debug log
            
            // Remove active class from all nav links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked nav link
            this.classList.add('active');
            
            // Show target page
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
                console.log('Page activated:', targetId); // Debug log
            } else {
                console.error('Page not found:', targetId); // Debug log
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Handle all internal page links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        if (!link.classList.contains('nav__link')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                navigateToPage(targetId);
            });
        }
    });
}

// Helper function to navigate to a page
function navigateToPage(pageId) {
    console.log('navigateToPage called with:', pageId); // Debug log
    
    const navLinks = document.querySelectorAll('.nav__link');
    const pages = document.querySelectorAll('.page');
    
    // Remove active class from all nav links and pages
    navLinks.forEach(l => l.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    // Find and activate the corresponding nav link
    const correspondingNavLink = document.querySelector(`.nav__link[href="#${pageId}"]`);
    if (correspondingNavLink) {
        correspondingNavLink.classList.add('active');
    }
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Successfully navigated to:', pageId); // Debug log
    } else {
        console.error('Target page not found:', pageId); // Debug log
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            console.log('Mobile menu toggled'); // Debug log
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu on window resize if desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const expertPrices = document.querySelectorAll('.expert-price');
    const selfPrices = document.querySelectorAll('.self-price');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.dataset.type;
            
            console.log('Pricing toggle:', type); // Debug log
            
            // Remove active class from all toggle buttons
            toggleButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide prices based on selection
            if (type === 'expert') {
                expertPrices.forEach(price => {
                    price.classList.remove('hidden');
                });
                selfPrices.forEach(price => {
                    price.classList.add('hidden');
                });
            } else if (type === 'self') {
                expertPrices.forEach(price => {
                    price.classList.add('hidden');
                });
                selfPrices.forEach(price => {
                    price.classList.remove('hidden');
                });
            }
        });
    });
}

// FAQ accordion functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.preventDefault();
            
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                const answer = q.parentElement.querySelector('.faq-answer');
                if (answer) {
                    answer.classList.add('hidden');
                }
            });
            
            // Toggle current FAQ item
            if (!isActive && faqAnswer) {
                this.classList.add('active');
                faqAnswer.classList.remove('hidden');
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Contact form submitted'); // Debug log
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !phone) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[0-9+\-\s\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Create mailto link to send email
            const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `Service: ${service || 'Not specified'}\n` +
                `Message: ${message || 'No message provided'}`
            );
            
            const mailtoLink = `mailto:info@gotaxhub.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            
            setTimeout(() => {
                showNotification('Thank you for your message! Our team will contact you within 24 hours.', 'success');
                this.reset();
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1000);
        });
    }
}

// Smooth scrolling and button interactions
function initSmoothScrolling() {
    // Handle hero CTA buttons
    const heroButtons = document.querySelectorAll('.hero__cta .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                navigateToPage(targetId);
            }
        });
    });
    
    // Handle header CTA buttons
    const headerButtons = document.querySelectorAll('.nav__cta .btn');
    headerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                navigateToPage(targetId);
            }
        });
    });
    
    // Handle service card links
    const serviceLinks = document.querySelectorAll('.service-card__link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                navigateToPage(targetId);
            }
        });
    });
    
    // Handle pricing preview buttons
    const pricingButtons = document.querySelectorAll('.pricing-cta .btn, .pricing-preview .btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                navigateToPage(targetId);
            }
        });
    });
    
    // Handle pricing plan buttons (Choose Plan)
    const choosePlanButtons = document.querySelectorAll('.pricing-plan .btn');
    choosePlanButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the plan name
            const planName = this.closest('.pricing-plan').querySelector('h3').textContent;
            
            // Navigate to contact page
            navigateToPage('contact');
            
            // Pre-fill the service field after navigation
            setTimeout(() => {
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    // Create a custom option for the selected plan
                    let option = serviceSelect.querySelector(`option[value="${planName.toLowerCase().replace(/\s+/g, '-')}"]`);
                    if (!option) {
                        option = document.createElement('option');
                        option.value = planName.toLowerCase().replace(/\s+/g, '-');
                        option.textContent = `ITR Filing - ${planName}`;
                        serviceSelect.appendChild(option);
                    }
                    serviceSelect.value = option.value;
                }
                
                // Show a notification
                showNotification(`Selected plan: ${planName}. Please fill in your details below.`, 'info');
            }, 500);
        });
    });
}

// Service card interactions
function initServiceCardInteractions() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Make the entire card clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the "Learn More" link
            if (e.target.classList.contains('service-card__link')) {
                return;
            }
            
            // Navigate to services page
            navigateToPage('services');
            
            // Get service name from card title
            const serviceName = this.querySelector('.service-card__title').textContent;
            
            // Highlight the corresponding service section after navigation
            setTimeout(() => {
                const serviceDetails = document.querySelectorAll('.service-detail h2');
                serviceDetails.forEach(detail => {
                    if (detail.textContent.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])) {
                        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        detail.parentElement.style.backgroundColor = 'var(--color-bg-1)';
                        setTimeout(() => {
                            detail.parentElement.style.backgroundColor = '';
                        }, 3000);
                    }
                });
            }, 500);
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification status status--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px 20px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Allow manual close on click
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (this.parentNode) {
                this.remove();
            }
        }, 300);
    });
}

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.service-card, .feature, .testimonial, .pricing-card, .team-member');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.style.transform || this.style.transform === 'none') {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate statistics on page load
    setTimeout(() => {
        const stats = document.querySelectorAll('.stat__number');
        stats.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateNumber(stat);
            }
        });
    }, 1000);
    
    function animateNumber(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 50);
    }
    
    // Add scroll-based header shadow
    let ticking = false;
    function updateHeader() {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key functionality
    if (e.key === 'Escape') {
        // Close mobile menu
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.click();
        }
        
        // Close open FAQ items
        const activeFAQ = document.querySelector('.faq-question.active');
        if (activeFAQ) {
            activeFAQ.click();
        }
    }
    
    // Enter key on interactive elements
    if (e.key === 'Enter') {
        if (e.target.classList.contains('faq-question')) {
            e.target.click();
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('GoTaxHub website initialized'); // Debug log
    
    // Ensure home page is shown by default
    const homeNavLink = document.querySelector('.nav__link[href="#home"]');
    const homePage = document.getElementById('home');
    
    if (homeNavLink && homePage) {
        homeNavLink.classList.add('active');
        homePage.classList.add('active');
    }
});

// Tax Calculator Functions
function calculateITR() {
    const income = parseFloat(document.getElementById('itr-income').value);
    const year = document.getElementById('itr-year').value;
    const resultDiv = document.getElementById('itr-result');
    
    if (!income || income <= 0) {
        resultDiv.innerHTML = '<p class="error">Please enter a valid annual income.</p>';
        return;
    }
    
    let tax = 0;
    let regime = 'New Tax Regime (FY ' + year + ')';
    
    // New tax regime slabs for FY 2024-25
    if (year === '2024-25') {
        if (income <= 300000) tax = 0;
        else if (income <= 700000) tax = (income - 300000) * 0.05;
        else if (income <= 1000000) tax = 20000 + (income - 700000) * 0.10;
        else if (income <= 1200000) tax = 50000 + (income - 1000000) * 0.15;
        else if (income <= 1500000) tax = 80000 + (income - 1200000) * 0.20;
        else tax = 140000 + (income - 1500000) * 0.30;
    }
    
    // Add 4% cess on tax amount
    const cess = tax * 0.04;
    const totalTax = tax + cess;
    
    resultDiv.innerHTML = `
        <h4>Tax Calculation Result</h4>
        <p><strong>Annual Income:</strong> ₹${income.toLocaleString()}</p>
        <p><strong>Tax Regime:</strong> ${regime}</p>
        <p><strong>Income Tax:</strong> ₹${tax.toLocaleString()}</p>
        <p><strong>Health & Education Cess (4%):</strong> ₹${cess.toLocaleString()}</p>
        <p><strong>Total Tax Liability:</strong> ₹${totalTax.toLocaleString()}</p>
    `;
}

function checkITREligibility() {
    const incomeType = document.getElementById('income-type').value;
    const resultDiv = document.getElementById('itr-eligibility-result');
    
    if (!incomeType) {
        resultDiv.innerHTML = '<p class="error">Please select an income type.</p>';
        return;
    }
    
    let form = '';
    let description = '';
    
    switch(incomeType) {
        case 'salary':
            form = 'ITR-1 (Sahaj)';
            description = 'For individuals with salary income, one house property, and other sources up to ₹50 lakhs';
            break;
        case 'salary-property':
            form = 'ITR-2';
            description = 'For individuals with salary income and multiple house properties or capital gains';
            break;
        case 'business':
            form = 'ITR-3';
            description = 'For individuals/HUFs with business or professional income';
            break;
        case 'capital-gains':
            form = 'ITR-2';
            description = 'For individuals with capital gains from investments or property';
            break;
        case 'foreign':
            form = 'ITR-2 or ITR-3';
            description = 'For individuals with foreign income or assets';
            break;
    }
    
    resultDiv.innerHTML = `
        <h4>ITR Form Required</h4>
        <p><strong>Recommended Form:</strong> ${form}</p>
        <p><strong>Description:</strong> ${description}</p>
    `;
}

function calculateGratuity() {
    const salary = parseFloat(document.getElementById('gratuity-salary').value);
    const years = parseFloat(document.getElementById('gratuity-years').value);
    const resultDiv = document.getElementById('gratuity-result');
    
    if (!salary || !years || salary <= 0 || years <= 0) {
        resultDiv.innerHTML = '<p class="error">Please enter valid salary and years of service.</p>';
        return;
    }
    
    if (years < 5) {
        resultDiv.innerHTML = '<p class="error">Gratuity is payable only after 5 years of continuous service.</p>';
        return;
    }
    
    // Gratuity = (Last drawn salary × 15 × Years of service) / 26
    const gratuity = (salary * 15 * years) / 26;
    const exemptLimit = 2000000; // ₹20 lakhs exemption limit
    const exemptAmount = Math.min(gratuity, exemptLimit);
    const taxableAmount = Math.max(0, gratuity - exemptLimit);
    
    resultDiv.innerHTML = `
        <h4>Gratuity Calculation Result</h4>
        <p><strong>Last Drawn Salary:</strong> ₹${salary.toLocaleString()}</p>
        <p><strong>Years of Service:</strong> ${years}</p>
        <p><strong>Total Gratuity:</strong> ₹${gratuity.toLocaleString()}</p>
        <p><strong>Exempt Amount:</strong> ₹${exemptAmount.toLocaleString()}</p>
        <p><strong>Taxable Amount:</strong> ₹${taxableAmount.toLocaleString()}</p>
    `;
}

function calculateTDS() {
    const income = parseFloat(document.getElementById('tds-income').value);
    const type = document.getElementById('tds-type').value;
    const resultDiv = document.getElementById('tds-result');
    
    if (!income || income <= 0 || !type) {
        resultDiv.innerHTML = '<p class="error">Please enter valid income and select TDS type.</p>';
        return;
    }
    
    let tds = 0;
    let threshold = 0;
    let rate = 0;
    
    switch(type) {
        case 'salary':
            // TDS on salary is calculated based on tax slabs
            tds = calculateTaxOnIncome(income);
            threshold = 300000;
            rate = 'As per tax slabs';
            break;
        case 'interest':
            threshold = 40000; // For senior citizens: ₹50,000
            rate = 10;
            if (income > threshold) {
                tds = (income - threshold) * 0.10;
            }
            break;
        case 'professional':
            threshold = 30000;
            rate = 10;
            if (income > threshold) {
                tds = income * 0.10;
            }
            break;
        case 'rent':
            threshold = 240000;
            rate = 10;
            if (income > threshold) {
                tds = income * 0.10;
            }
            break;
    }
    
    resultDiv.innerHTML = `
        <h4>TDS Calculation Result</h4>
        <p><strong>Income Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p><strong>Annual Income:</strong> ₹${income.toLocaleString()}</p>
        <p><strong>TDS Threshold:</strong> ₹${threshold.toLocaleString()}</p>
        <p><strong>TDS Rate:</strong> ${rate}${typeof rate === 'number' ? '%' : ''}</p>
        <p><strong>TDS Amount:</strong> ₹${tds.toLocaleString()}</p>
    `;
}

function calculateTaxOnIncome(income) {
    let tax = 0;
    if (income <= 300000) tax = 0;
    else if (income <= 700000) tax = (income - 300000) * 0.05;
    else if (income <= 1000000) tax = 20000 + (income - 700000) * 0.10;
    else if (income <= 1200000) tax = 50000 + (income - 1000000) * 0.15;
    else if (income <= 1500000) tax = 80000 + (income - 1200000) * 0.20;
    else tax = 140000 + (income - 1500000) * 0.30;
    
    return tax * 1.04; // Add 4% cess
}

function calculateLeaveEncashment() {
    const salary = parseFloat(document.getElementById('leave-salary').value);
    const leaveDays = parseFloat(document.getElementById('leave-days').value);
    const years = parseFloat(document.getElementById('leave-years').value);
    const resultDiv = document.getElementById('leave-result');
    
    if (!salary || !leaveDays || !years || salary <= 0 || leaveDays <= 0 || years <= 0) {
        resultDiv.innerHTML = '<p class="error">Please enter valid salary, leave days, and years of service.</p>';
        return;
    }
    
    const dailySalary = salary / 30;
    const totalEncashment = dailySalary * leaveDays;
    
    // Exemption calculation: Lesser of 3 lakhs or 10 months salary or actual encashment
    const tenMonthsSalary = salary * 10;
    const exemptLimit = 300000;
    const exemptAmount = Math.min(exemptLimit, tenMonthsSalary, totalEncashment);
    const taxableAmount = Math.max(0, totalEncashment - exemptAmount);
    
    resultDiv.innerHTML = `
        <h4>Leave Encashment Calculation</h4>
        <p><strong>Last Drawn Salary:</strong> ₹${salary.toLocaleString()}</p>
        <p><strong>Leave Days Encashed:</strong> ${leaveDays}</p>
        <p><strong>Daily Salary:</strong> ₹${dailySalary.toLocaleString()}</p>
        <p><strong>Total Encashment:</strong> ₹${totalEncashment.toLocaleString()}</p>
        <p><strong>Exempt Amount:</strong> ₹${exemptAmount.toLocaleString()}</p>
        <p><strong>Taxable Amount:</strong> ₹${taxableAmount.toLocaleString()}</p>
    `;
}

function compareRegimes() {
    const income = parseFloat(document.getElementById('regime-income').value);
    const deduction80C = parseFloat(document.getElementById('regime-80c').value) || 0;
    const resultDiv = document.getElementById('regime-result');
    
    if (!income || income <= 0) {
        resultDiv.innerHTML = '<p class="error">Please enter a valid annual income.</p>';
        return;
    }
    
    // New Tax Regime Calculation
    let newRegimeTax = 0;
    if (income <= 300000) newRegimeTax = 0;
    else if (income <= 700000) newRegimeTax = (income - 300000) * 0.05;
    else if (income <= 1000000) newRegimeTax = 20000 + (income - 700000) * 0.10;
    else if (income <= 1200000) newRegimeTax = 50000 + (income - 1000000) * 0.15;
    else if (income <= 1500000) newRegimeTax = 80000 + (income - 1200000) * 0.20;
    else newRegimeTax = 140000 + (income - 1500000) * 0.30;
    
    newRegimeTax *= 1.04; // Add 4% cess
    
    // Old Tax Regime Calculation
    const taxableIncome = Math.max(0, income - deduction80C - 50000); // Standard deduction
    let oldRegimeTax = 0;
    if (taxableIncome <= 250000) oldRegimeTax = 0;
    else if (taxableIncome <= 500000) oldRegimeTax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000) oldRegimeTax = 12500 + (taxableIncome - 500000) * 0.20;
    else oldRegimeTax = 112500 + (taxableIncome - 1000000) * 0.30;
    
    oldRegimeTax *= 1.04; // Add 4% cess
    
    const savings = oldRegimeTax - newRegimeTax;
    const recommendedRegime = newRegimeTax < oldRegimeTax ? 'New Tax Regime' : 'Old Tax Regime';
    
    resultDiv.innerHTML = `
        <h4>Tax Regime Comparison</h4>
        <div class="regime-comparison">
            <div class="regime-option">
                <h5>New Tax Regime</h5>
                <p><strong>Tax Liability:</strong> ₹${newRegimeTax.toLocaleString()}</p>
                <p>No deductions allowed</p>
            </div>
            <div class="regime-option">
                <h5>Old Tax Regime</h5>
                <p><strong>Tax Liability:</strong> ₹${oldRegimeTax.toLocaleString()}</p>
                <p>With ₹${deduction80C.toLocaleString()} deductions</p>
            </div>
        </div>
        <p><strong>Recommended:</strong> ${recommendedRegime}</p>
        <p><strong>Potential Savings:</strong> ₹${Math.abs(savings).toLocaleString()}</p>
    `;
}