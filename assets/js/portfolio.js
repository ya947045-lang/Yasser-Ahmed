// معرض الأعمال
document.addEventListener('DOMContentLoaded', function() {
    // التصفية
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            // الحصول على الفئة المحددة
            const filterValue = this.getAttribute('data-filter');
            
            // تصفية العناصر
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // عرض تفاصيل المشروع
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            showProjectDetails({
                title: title,
                description: description,
                category: category,
                image: this.querySelector('img').src
            });
        });
    });
    
    // تأثيرات الظهور
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach(item => {
        observer.observe(item);
    });
});

// عرض تفاصيل المشروع
function showProjectDetails(project) {
    // إنشاء نافذة المشروع
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="modal-header">
                <span class="project-category">${project.category}</span>
                <h2>${project.title}</h2>
            </div>
            <div class="modal-body">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>تفاصيل المشروع</h3>
                    <p>${project.description}</p>
                    
                    <div class="project-tech">
                        <h4>التقنيات المستخدمة:</h4>
                        <div class="tech-tags">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                        </div>
                    </div>
                    
                    <div class="project-links">
                        <a href="#" class="live-link">🌐 عرض الموقع</a>
                        <a href="#" class="source-link">💻 عرض الكود</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة إلى body
    document.body.appendChild(modal);
    
    // إضافة التنسيقات
    const style = document.createElement('style');
    style.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s;
        }
        
        .modal-content {
            background: white;
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 10px;
            padding: 30px;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            left: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #333;
        }
        
        .project-image img {
            width: 100%;
            border-radius: 5px;
        }
        
        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }
        
        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
    
    // إغلاق النافذة
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    });
    
    // إغلاق عند النقر خارج المحتوى
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.querySelector('.close-modal').click();
        }
    });
}
