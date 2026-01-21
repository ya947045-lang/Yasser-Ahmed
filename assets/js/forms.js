// معالجة النماذج
document.addEventListener('DOMContentLoaded', function() {
    // نموذج التواصل
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value
            };
            
            // التحقق من البيانات
            if (!validateContactForm(formData)) {
                return;
            }
            
            // إرسال البيانات
            sendContactForm(formData);
        });
    }
    
    // النشرة البريدية
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
        });
    });
    
    // نموذج التعليقات
    const commentForms = document.querySelectorAll('.comment-form button');
    commentForms.forEach(button => {
        button.addEventListener('click', function() {
            const textarea = this.parentElement.querySelector('textarea');
            addComment(textarea.value);
            textarea.value = '';
        });
    });
    
    // الأسئلة الشائعة
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.style.display === 'block';
            
            // إغلاق جميع الإجابات
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.display = 'none';
            });
            
            // فتح/إغلاق الإجابة الحالية
            answer.style.display = isActive ? 'none' : 'block';
        });
    });
});

// التحقق من نموذج التواصل
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 3) {
        errors.push('الاسم يجب أن يكون 3 أحرف على الأقل');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('البريد الإلكتروني غير صالح');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('الرسالة يجب أن تكون 10 أحرف على الأقل');
    }
    
    if (errors.length > 0) {
        showErrors(errors);
        return false;
    }
    
    return true;
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// إظهار الأخطاء
function showErrors(errors) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <h4>يوجد أخطاء في النموذج:</h4>
        <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
    `;
    
    const form = document.getElementById('contactForm');
    form.prepend(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// إرسال نموذج التواصل
function sendContactForm(data) {
    // هنا ستتم عملية الإرسال الحقيقية
    console.log('بيانات النموذج:', data);
    
    // رسالة نجاح
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <h4>🎉 تم إرسال رسالتك بنجاح!</h4>
        <p>سنرد عليك في أقرب وقت ممكن</p>
    `;
    
    const form = document.getElementById('contactForm');
    form.innerHTML = '';
    form.appendChild(successDiv);
    
    // إعادة تعيين النموذج بعد 5 ثوان
    setTimeout(() => {
        successDiv.remove();
        form.reset();
    }, 5000);
}

// الاشتراك في النشرة البريدية
function subscribeNewsletter(email) {
    console.log('تم الاشتراك بالبريد:', email);
    
    // رسالة نجاح
    alert('🎉 تم الاشتراك في النشرة البريدية بنجاح!');
}

// إضافة تعليق
function addComment(text) {
    if (!text.trim()) {
        alert('الرجاء كتابة تعليق');
        return;
    }
    
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <div class="comment-header">
            <strong>مستخدم جديد</strong>
            <span>الآن</span>
        </div>
        <p>${text}</p>
    `;
    
    const commentsSection = document.querySelector('.comments');
    if (commentsSection) {
        commentsSection.appendChild(commentDiv);
    }
}
