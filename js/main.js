// Angler BI Main JS (migrated from index.html)
document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.classList.toggle('open');
    });
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.classList.remove('open');
        });
    });
    // --- Smooth Scrolling & Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const mainNavLinks = document.querySelectorAll('header nav a');
    const mobileHeaderNavLinks = document.querySelectorAll('#mobileMenu a');
    function changeNav() {
        let index = sections.length;
        const scrollYWithOffset = window.scrollY + (window.innerHeight / 3);
        while(--index >= 0 && scrollYWithOffset < sections[index].offsetTop) {}
        mainNavLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0 && mainNavLinks[index]) {
            mainNavLinks[index].classList.add('active');
        }
        mobileHeaderNavLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0 && mobileHeaderNavLinks[index]) {
            mobileHeaderNavLinks[index].classList.add('active');
        }
    }
    changeNav();
    window.addEventListener('scroll', changeNav);
    // --- Service Card Modal ---
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('caseStudyModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const modalBackButton = document.getElementById('modalBackButton');
    const caseStudies = {
        'strategy': {
            title: "Data Strategy for E-commerce Leader",
            client: "A Leading E-commerce Retailer",
            challenge: "The client struggled with disparate data sources and lacked a unified view of customer behavior, hindering personalized marketing efforts and inventory management.",
            solution: "Angler BI developed a comprehensive data strategy, including data governance frameworks, a centralized data warehouse architecture, and a roadmap for BI tool implementation. We focused on integrating sales, marketing, and inventory data.",
            results: "Achieved a 25% improvement in marketing campaign ROI, a 15% reduction in stockouts through better demand forecasting, and provided a unified dashboard for real-time decision-making.",
            visuals: "https://images.pexels.com/photos/5716037/pexels-photo-5716037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        'visualization': {
            title: "Interactive Dashboards for Sales Performance",
            client: "Manufacturing Firm",
            challenge: "Sales leadership lacked timely insights into regional performance, product sales trends, and sales rep effectiveness due to static, outdated reports.",
            solution: "We designed and deployed interactive Power BI dashboards, connecting directly to their CRM and ERP systems. Dashboards featured drill-down capabilities, KPI tracking, and automated alerts.",
            results: "Enabled sales managers to identify performance gaps 50% faster, leading to a 10% increase in overall sales productivity. Reduced report generation time by 80%.",
            visuals: "https://app.powerbi.com/view?r=eyJrIjoiODg1NzE2NTUtZjU1Yy00Y2ExLTkwZmMtMDEwZWY1ODJmYzQ4IiwidCI6ImZlMTYxMDVjLTJjZDQtNDQ0Ny1iMDVmLTQ0MGNiMjMzMDQxYSIsImMiOjF9"
        },
        'analytics': {
            title: "Predictive Analytics for Customer Churn",
            client: "Subscription Service Provider",
            challenge: "High customer churn rates were impacting revenue. The client needed to proactively identify at-risk customers and implement retention strategies.",
            solution: "Angler BI built a predictive churn model using machine learning, analyzing customer demographics, usage patterns, and support interactions. This model identified customers with a high probability of churning.",
            results: "The implemented model predicted churn with 75% accuracy, allowing targeted retention campaigns that reduced overall churn by 18% within 6 months.",
            visuals: "https://placehold.co/600x300/2D3748/00B2EE?text=Churn+Prediction+Model+Output&font=Inter"
        }
    };
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.dataset.serviceId;
            const data = caseStudies[serviceId];
            if (data) {
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalClient').textContent = `Client: ${data.client}`;
                document.getElementById('modalChallenge').innerHTML = data.challenge;
                document.getElementById('modalSolution').innerHTML = data.solution;
                document.getElementById('modalResults').innerHTML = data.results;
                // Embed Power BI if visuals is a Power BI URL, else use <img>
                let visualsHtml;
                if (typeof data.visuals === 'string' && data.visuals.includes('app.powerbi.com/view')) {
                    const iframeId = 'powerbi-iframe';
                    visualsHtml = `<iframe id="${iframeId}" width="100%" height="400" src="${data.visuals}" frameborder="0" allowfullscreen="true" style="border-radius:12px;box-shadow:0 2px 8px #0002;"></iframe>`;
                    setTimeout(() => {
                        const iframe = document.getElementById(iframeId);
                        if (iframe) {
                            iframe.onload = function() {
                                try {
                                    const css = '.brandingBar, .report-footer, .logoBar, [title="Microsoft Power BI"] { display: none !important; }';
                                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                                    const style = iframeDoc.createElement('style');
                                    style.innerHTML = css;
                                    iframeDoc.head.appendChild(style);
                                } catch (e) {
                                    // Cross-origin, cannot inject CSS
                                }
                            };
                        }
                    }, 100);
                } else {
                    visualsHtml = `<img src="${data.visuals}" alt="${data.title} Visual" class="w-full h-auto rounded-lg shadow-md">`;
                }
                document.getElementById('modalVisuals').innerHTML = visualsHtml;
                modal.classList.remove('closed');
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    function closeModal() {
        modal.classList.remove('open');
        modal.classList.add('closed');
        document.body.style.overflow = '';
    }
    closeModalButton.addEventListener('click', closeModal);
    modalBackButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
    modal.addEventListener('click', (event) => {
        if (event.target === modal && modal.classList.contains('open')) {
            closeModal();
        }
    });
    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        formFeedback.textContent = '';
        formFeedback.classList.remove('text-green-400', 'text-red-400', 'text-yellow-400');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        if (!name || !email || !message) {
            formFeedback.textContent = 'Please fill in all required fields.';
            formFeedback.classList.add('text-red-400');
            if (!name) nameInput.focus();
            else if (!email) emailInput.focus();
            else if (!message) messageInput.focus();
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            formFeedback.textContent = 'Please enter a valid email address.';
            formFeedback.classList.add('text-red-400');
            emailInput.focus();
            return;
        }
        formFeedback.textContent = 'Sending your message...';
        formFeedback.classList.add('text-yellow-400');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        setTimeout(() => {
            console.log('Form submitted:', {
                name,
                email,
                company: document.getElementById('company').value.trim(),
                message
            });
            formFeedback.textContent = 'Message sent successfully! We will get back to you soon.';
            formFeedback.classList.remove('text-yellow-400');
            formFeedback.classList.add('text-green-400');
            contactForm.reset();
            submitButton.disabled = false;
        }, 1500);
    });
    // --- Footer Current Year ---
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
