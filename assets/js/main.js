// التنقل المتحرك
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '10px 0';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
        nav.style.padding = '20px 0';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// القائمة المتحركة على الموبايل
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('nav').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active');
    });
});

// تحميل الصور بسلاسة
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.5s';
            this.style.opacity = '1';
        });
    });
});
