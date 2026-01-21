// Handle Server Side Includes (SSI) or client-side includes
document.addEventListener('DOMContentLoaded', function() {
    // Handle breadcrumb navigation
    updateBreadcrumb();
    
    // Handle page titles
    updatePageTitles();
    
    // Handle active navigation links
    setActiveNavLink();
    
    // Handle theme toggle
    setupThemeToggle();
});

// Update breadcrumb based on current page
function updateBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    
    const currentPage = getCurrentPage();
    const pages = {
        'index': 'الرئيسية',
        'about': 'عني',
        'portfolio': 'أعمالي',
        'blog': 'المدونة',
        'services': 'الخدمات',
        'contact': 'تواصل معي',
        'privacy': 'سياسة الخصوصية'
    };
    
    if (pages[currentPage]) {
        const li = document.createElement('li');
        li.textContent = pages[currentPage];
        breadcrumb.appendChild(li);
    }
}

// Update page titles and subtitles
function updatePageTitles() {
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (!pageTitle) return;
    
    const currentPage = getCurrentPage();
    const titles = {
        'about': {
            title: 'عني',
            subtitle: 'تعرف عليّ أكثر'
        },
        'portfolio': {
            title: 'أعمالي',
            subtitle: 'معرض مشاريعي السابقة'
        },
        'blog': {
            title: 'المدونة',
            subtitle: 'أفكار وتجارب ونصائح'
        },
        'services': {
            title: 'الخدمات',
            subtitle: 'ما أقدمه لك من حلول رقمية'
        },
        'contact': {
            title: 'تواصل معي',
            subtitle: 'لنتحدث عن مشروعك القادم'
        },
        'privacy': {
            title: 'سياسة الخصوصية',
            subtitle: 'كيف نحمي بياناتك'
        }
    };
    
    if (titles[currentPage]) {
        pageTitle.textContent = titles[currentPage].title;
        if (pageSubtitle) {
            pageSubtitle.textContent = titles[currentPage].subtitle;
        }
        
        // Update document title
        document.title = `${titles[currentPage].title} | Future Maker`;
    }
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
            if (link.parentElement.classList.contains('dropdown')) {
                link.parentElement.classList.add('active');
            }
        }
    });
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page || 'index';
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        mobileClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Back to top button
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all functions
function init() {
    setupMobileMenu();
    setupBackToTop();
    setupThemeToggle();
    updateBreadcrumb();
    updatePageTitles();
    setActiveNavLink();
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
