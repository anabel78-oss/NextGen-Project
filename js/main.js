/**
 * ANABEL OBIEZE PORTFOLIO - MAIN JAVASCRIPT
 * Restructured with ES6 modules and modern syntax
 * All interactive functionality for the portfolio website
 */

// Portfolio Projects Data
const projects = [
    {
        id: 'omacart',
        title: 'Omacart',
        category: 'web',
        tag: 'Web',
        color: '#14c8a8',
        description: 'E-commerce mobile app for online shopping.',
        role: 'Developer',
        timeline: '2024',
        problem: 'Users need a convenient platform for online shopping.',
        solution: 'Built and deployed the Omacart mobile application on Google Play Store.',
        results: [
            ['Live', 'Available on Play Store'],
            ['Mobile', 'Android App'],
            ['E-commerce', 'Shopping Platform']
        ],
        image: 'image/Omacart.jpg',
        link: 'https://play.google.com/store/apps/details?id=com.omacartltd.omacart&pcampaignid=web_share'
    },
    {
        id: 'gbase',
        title: 'Gbase App',
        category: 'web',
        tag: 'Web',
        color: '#4d57ff',
        description: 'Web application built with modern technologies.',
        role: 'Developer',
        timeline: '2024',
        problem: 'Need a functional web application for specific use case.',
        solution: 'Developed and deployed the Gbase App on Vercel.',
        results: [
            ['Live', 'Deployed on Vercel'],
            ['Web App', 'Responsive Design'],
            ['Modern', 'Built with latest tech']
        ],
        image: 'image/Gbase app.jpg',
        link: 'https://gbese-app-xsfo.vercel.app'
    },
    {
        id: 'civiclink',
        title: 'CivicLinkNG',
        category: 'web',
        tag: 'Web',
        color: '#f5a524',
        description: 'Civic engagement platform for Nigerian citizens.',
        role: 'Developer',
        timeline: '2024',
        problem: 'Citizens need better access to civic information and services.',
        solution: 'Built a civic engagement platform connecting citizens with civic opportunities.',
        results: [
            ['Live', 'Deployed on Vercel'],
            ['Civic', 'Engagement Platform'],
            ['Nigeria', 'Locally Focused']
        ],
        image: 'image/Civic link.jpg',
        link: 'https://civiclinkng.vercel.app'
    },
    {
        id: 'tabi',
        title: 'Tabi Payment Plan',
        category: 'web',
        tag: 'Web',
        color: '#a855f7',
        description: 'Pricing table for payment plans.',
        role: 'Developer',
        timeline: '2024',
        problem: 'Businesses need clear pricing tables for their services.',
        solution: 'Created a clean and responsive pricing table component.',
        results: [
            ['Responsive', 'Mobile Friendly'],
            ['Clean UI', 'Easy to Read'],
            ['HTML/CSS', 'Pure Implementation']
        ],
        image: 'image/Tabi payment plan.jpg',
        link: 'file:///C:/Upskill-project-week4/Pricing-tabel%20week%203/index.html'
    },
    {
        id: 'market',
        title: 'Afrimart Storefront',
        category: 'web',
        tag: 'Web',
        color: '#f5a524',
        description: 'Fast mobile-first ecommerce storefront.',
        role: 'Lead Developer',
        timeline: '6 months · 2021',
        problem: 'The old shop loaded slowly on mobile data and lost shoppers at checkout.',
        solution: 'Rebuilt the storefront in Next.js with image optimisation, saved carts and a one-page checkout.',
        results: [
            ['1.4s', 'Mobile load time'],
            ['+38%', 'Checkout conversion'],
            ['80k', 'Monthly shoppers']
        ]
    },
    {
        id: 'clinic',
        title: 'ClinicGo Booking App',
        category: 'product',
        tag: 'Product',
        color: '#a855f7',
        description: 'Appointment booking for private clinics.',
        role: 'Product Manager & Developer',
        timeline: '5 months · 2023',
        problem: 'Front desks managed bookings through phone calls and spreadsheets, causing double bookings.',
        solution: 'Mapped the booking journey, defined the MVP and built the patient and admin web app.',
        results: [
            ['0', 'Double bookings after launch'],
            ['9', 'Clinics onboarded'],
            ['-30%', 'No-shows']
        ]
    }
];

/**
 * Utility function to select elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null} Selected element
 */
const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Utility function to select multiple elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element[]} Array of selected elements
 */
const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

/**
 * Toast notification system
 */
class Toast {
    constructor() {
        this.toastElement = $('#toast');
        this.timeout = null;
    }
    
    show(message) {
        if (!this.toastElement) return;
        
        this.toastElement.textContent = message;
        this.toastElement.classList.add('show');
        
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.toastElement.classList.remove('show');
        }, 2600);
    }
}

/**
 * Portfolio Projects Manager
 */
class PortfolioManager {
    constructor() {
        this.workGrid = $('#work');
        this.modal = $('#modal');
        this.sheet = $('#sheet');
        this.modalCloseBtn = $('#mClose');
        this.lastFocusedElement = null;
        this.toast = new Toast();
        
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.bindEvents();
    }
    
    renderProjects() {
        if (!this.workGrid) return;
        
        projects.forEach(project => {
            const projectButton = document.createElement('button');
            projectButton.type = 'button';
            projectButton.className = 'proj';
            projectButton.style.setProperty('--c', project.color);
            projectButton.dataset.category = project.category;
            projectButton.dataset.id = project.id;
            
            projectButton.innerHTML = `
                <div class="thumb">
                    <span class="tag">${project.tag}</span>
                    ${project.image ? `<img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;">` : `
                    <div class="mock">
                        <i></i><i></i><i></i>
                        <div class="blocks">
                            <u></u><u></u><u></u>
                        </div>
                    </div>
                    `}
                </div>
                <div class="proj-body">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <span class="go">View case study →</span>
                </div>
            `;
            
            this.workGrid.appendChild(projectButton);
        });
    }
    
    bindEvents() {
        // Project click events
        if (this.workGrid) {
            this.workGrid.addEventListener('click', (e) => {
                const projectBtn = e.target.closest('.proj');
                if (projectBtn) {
                    this.openProject(projectBtn.dataset.id);
                }
            });
        }
        
        // Modal events
        if (this.modalCloseBtn) {
            this.modalCloseBtn.addEventListener('click', () => this.closeProject());
        }
        
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeProject();
                }
            });
        }
        
        // Filter events
        $$('.filters .chip').forEach(chip => {
            chip.addEventListener('click', () => {
                $$('.filters .chip').forEach(c => {
                    c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
                });
                
                const filter = chip.dataset.f;
                $$('.proj').forEach(project => {
                    if (filter === 'all') {
                        project.hidden = false;
                    } else {
                        project.hidden = project.dataset.category !== filter;
                    }
                });
            });
        });
    }
    
    openProject(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project || !this.sheet || !this.modal) return;
        
        this.lastFocusedElement = document.activeElement;
        
        // Build results HTML
        const resultsHTML = project.results
            .map(([value, label]) => `<div><b>${value}</b><span>${label}</span></div>`)
            .join('');
        
        const projectImageHTML = project.image 
            ? `<div class="thumb" style="--c: ${project.color}"><img src="${project.image}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;"><span class="tag">${project.tag}</span></div>`
            : `<div class="thumb" style="--c: ${project.color}"><span class="tag">${project.tag}</span><div class="mock"><i></i><i></i><i></i><div class="blocks"><u></u><u></u><u></u></div></div></div>`;
        
        this.sheet.innerHTML = `
            ${projectImageHTML}
            <div class="sheet-b">
                <h3 id="mTitle">${project.title}</h3>
                <div class="meta">
                    <span>Role: <b>${project.role}</b></span>
                    <span>Timeline: <b>${project.timeline}</b></span>
                </div>
                <div>
                    <h4>The problem</h4>
                    <p>${project.problem}</p>
                </div>
                <div>
                    <h4>What I did</h4>
                    <p>${project.solution}</p>
                </div>
                <div>
                    <h4>Results</h4>
                    <div class="res">${resultsHTML}</div>
                </div>
                ${project.link ? `<a class="pill solid" href="${project.link}" target="_blank" rel="noopener noreferrer" style="justify-self:start">View Project</a>` : `<a class="pill solid" href="#contact" id="mCta" style="justify-self:start">Start a similar project</a>`}
            </div>
        `;
        
        this.modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        const closeBtn = this.modalCloseBtn;
        if (closeBtn) closeBtn.focus();
        
        if (!project.link) {
            const ctaBtn = $('#mCta');
            if (ctaBtn) {
                ctaBtn.addEventListener('click', () => this.closeProject());
            }
        }
    }
    
    closeProject() {
        if (!this.modal) return;
        
        this.modal.classList.remove('open');
        document.body.style.overflow = '';
        
        if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
            try {
                this.lastFocusedElement.focus({ preventScroll: true });
            } catch (e) {
                // Ignore focus errors
            }
        }
    }
}

/**
 * Navigation Manager
 */
class NavigationManager {
    constructor() {
        this.nav = $('#nav');
        this.burger = $('#burger');
        this.drawer = $('#drawer');
        this.toast = new Toast();
        
        this.init();
    }
    
    init() {
        this.bindScrollEvents();
        this.bindMobileMenuEvents();
        this.bindNavigationEvents();
        this.bindIntersectionObserver();
        this.bindCVButtons();
        this.bindSoonLinks();
    }
    
    bindScrollEvents() {
        if (!this.nav) return;
        
        window.addEventListener('scroll', () => {
            this.nav.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }
    
    bindMobileMenuEvents() {
        if (!this.burger || !this.drawer) return;
        
        this.burger.addEventListener('click', () => {
            const isOpen = this.burger.getAttribute('aria-expanded') === 'true';
            this.burger.setAttribute('aria-expanded', !isOpen);
            this.drawer.classList.toggle('open', !isOpen);
            document.body.style.overflow = !isOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking drawer links
        $$('#drawer a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }
    
    closeMobileMenu() {
        if (!this.burger || !this.drawer) return;
        
        this.burger.setAttribute('aria-expanded', 'false');
        this.drawer.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    bindNavigationEvents() {
        // Section mapping for active navigation states
        const sectionMap = {
            home: 'home',
            about: 'about',
            service: 'service',
            portfolio: 'portfolio',
            experience: 'portfolio',
            blog: 'blog',
            contact: 'contact'
        };
    }
    
    bindIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        const sectionMap = {
            home: 'home',
            about: 'about',
            service: 'service',
            portfolio: 'portfolio',
            experience: 'portfolio',
            blog: 'blog',
            contact: 'contact'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const navKey = sectionMap[sectionId];
                    
                    if (navKey) {
                        $$('[data-s]').forEach(link => {
                            link.classList.toggle('active', link.dataset.s === navKey);
                        });
                    }
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        
        $$('section[id]').forEach(section => {
            observer.observe(section);
        });
    }
    
    bindCVButtons() {
        const cvBtn = $('#cvBtn');
        const cvBtn2 = $('#cvBtn2');
        
        const showCVToast = () => {
            this.toast.show('Prototype: CV download will be linked to your PDF');
        };
        
        if (cvBtn) cvBtn.addEventListener('click', showCVToast);
        if (cvBtn2) {
            cvBtn2.addEventListener('click', () => {
                this.closeMobileMenu();
                showCVToast();
            });
        }
    }
    
    bindSoonLinks() {
        $$('[data-soon]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.toast.show('Prototype: this link goes live later');
            });
        });
    }
}

/**
 * Photo Upload Manager
 */
class PhotoManager {
    constructor() {
        this.photoInput = $('#photoIn');
        this.swapBtn = $('#swapBtn');
        this.portrait = $('#portrait');
        this.portraitSvg = $('#portraitSvg');
        
        this.init();
    }
    
    init() {
        if (!this.swapBtn || !this.photoInput) return;
        
        this.swapBtn.addEventListener('click', () => {
            this.photoInput.click();
        });
        
        this.photoInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                // Hide SVG
                if (this.portraitSvg) {
                    this.portraitSvg.style.display = 'none';
                }
                
                // Create or update image
                let imgElement = $('#portrait img');
                if (!imgElement && this.portrait) {
                    imgElement = document.createElement('img');
                    imgElement.alt = 'Anabel Obieze';
                    this.portrait.insertBefore(imgElement, this.portraitSvg);
                }
                
                if (imgElement && event.target.result) {
                    imgElement.src = event.target.result;
                }
            };
            
            reader.readAsDataURL(file);
        });
    }
}

/**
 * Contact Form Manager
 */
class ContactFormManager {
    constructor() {
        this.form = $('#form');
        this.typeButtons = $$('#type .chip');
        this.againBtn = $('#again');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.bindTypeButtons();
        this.bindFormSubmission();
        this.bindResetButton();
    }
    
    bindTypeButtons() {
        this.typeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.typeButtons.forEach(btn => {
                    btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
                });
            });
        });
    }
    
    bindFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Get form values
            const nameInput = $('#fn');
            const emailInput = $('#fe');
            const messageInput = $('#fm');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            
            // Validate name
            if (!name) {
                this.setError('fn', 'Enter your name.');
                isValid = false;
            } else {
                this.setError('fn', '');
            }
            
            // Validate email
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)) {
                this.setError('fe', 'Enter a valid email address.');
                isValid = false;
            } else {
                this.setError('fe', '');
            }
            
            // Validate message
            if (message.length < 10) {
                this.setError('fm', 'Add a few details about your project.');
                isValid = false;
            } else {
                this.setError('fm', '');
            }
            
            // If valid, show success message
            if (isValid) {
                this.form.classList.add('sent');
            }
        });
    }
    
    bindResetButton() {
        if (!this.againBtn) return;
        
        this.againBtn.addEventListener('click', () => {
            this.form.reset();
            this.form.classList.remove('sent');
            
            // Reset type buttons to first one
            this.typeButtons.forEach((btn, index) => {
                btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
            });
            
            // Clear all errors
            this.setError('fn', '');
            this.setError('fe', '');
            this.setError('fm', '');
        });
    }
    
    setError(fieldId, message) {
        const input = $(`#${fieldId}`);
        const errorElement = $(`[data-for="${fieldId}"]`);
        
        if (input) {
            input.classList.toggle('invalid', !!message);
        }
        
        if (errorElement) {
            errorElement.textContent = message || '';
        }
    }
}

/**
 * Initialize all components when DOM is ready
 */
const initApp = () => {
    new PortfolioManager();
    new NavigationManager();
    new PhotoManager();
    new ContactFormManager();
    
    // Global keyboard event for Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = $('#modal');
            const drawer = $('#drawer');
            const burger = $('#burger');
            
            if (modal && modal.classList.contains('open')) {
                // Close modal
                const portfolioManager = document.querySelector('.portfolio-instance');
                // Modal close is handled by PortfolioManager instance
                const closeBtn = $('#mClose');
                if (closeBtn) closeBtn.click();
            }
            
            if (drawer && drawer.classList.contains('open') && burger) {
                burger.click();
            }
        }
    });
};

// Run initialization when DOM content is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
