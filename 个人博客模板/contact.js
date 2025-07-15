// 联系页面专用功能
document.addEventListener('DOMContentLoaded', function() {
    // 联系表单处理
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 表单验证
        if (!validateForm()) {
            return;
        }
        
        // 显示加载状态
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // 模拟表单提交
        setTimeout(() => {
            // 这里可以添加实际的表单提交逻辑
            showNotification('消息发送成功！我会尽快回复您。', 'success');
            
            // 重置表单
            contactForm.reset();
            
            // 恢复按钮状态
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
    });

    // 表单验证函数
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '') {
            showNotification('请输入您的姓名', 'error');
            return false;
        }
        
        if (email === '') {
            showNotification('请输入您的邮箱', 'error');
            return false;
        }
        
        if (!validateEmail(email)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return false;
        }
        
        if (message === '') {
            showNotification('请输入您的消息', 'error');
            return false;
        }
        
        if (message.length < 10) {
            showNotification('消息内容至少需要10个字符', 'error');
            return false;
        }
        
        return true;
    }

    // 邮箱验证函数
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // FAQ展开/收起功能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // 关闭其他所有FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('i');
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // 切换当前FAQ
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 联系信息点击复制功能
    const contactDetails = document.querySelectorAll('.contact-text p');
    
    contactDetails.forEach(detail => {
        detail.style.cursor = 'pointer';
        detail.addEventListener('click', function() {
            const text = this.textContent;
            
            // 复制到剪贴板
            navigator.clipboard.writeText(text).then(() => {
                showNotification('已复制到剪贴板', 'success');
            }).catch(() => {
                // 备用方法
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('已复制到剪贴板', 'success');
            });
        });
        
        // 添加悬停提示
        detail.title = '点击复制';
    });

    // 社交图标悬停效果
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 表单输入框焦点效果
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // 如果输入框有值，添加focused类
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    // 字符计数功能
    const messageTextarea = document.getElementById('message');
    const charCount = document.createElement('div');
    charCount.className = 'char-count';
    charCount.textContent = '0 / 1000';
    messageTextarea.parentElement.appendChild(charCount);
    
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length} / 1000`;
        
        if (length > 900) {
            charCount.style.color = '#ef4444';
        } else if (length > 800) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = '#6b7280';
        }
    });

    // 添加表单动画效果
    function addFormAnimations() {
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // 启动表单动画
    addFormAnimations();
});

// 添加联系页面专用样式
const contactStyles = `
    .contact-main {
        padding: 80px 0;
        background: #f9fafb;
    }

    .contact-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        margin-bottom: 80px;
    }

    .contact-info h2,
    .contact-form-container h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #1f2937;
    }

    .contact-info p {
        color: #6b7280;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .contact-details {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }

    .contact-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .contact-icon {
        width: 50px;
        height: 50px;
        background: #3b82f6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.25rem;
        flex-shrink: 0;
    }

    .contact-text h3 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #1f2937;
    }

    .contact-text p {
        color: #6b7280;
        font-size: 0.875rem;
        margin: 0;
    }

    .social-links-contact h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1f2937;
    }

    .social-icons {
        display: flex;
        gap: 1rem;
    }

    .social-icon {
        width: 45px;
        height: 45px;
        background: #374151;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .social-icon:hover {
        background: #3b82f6;
        transform: translateY(-3px) scale(1.1);
    }

    .contact-form-container {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .form-group {
        margin-bottom: 1.5rem;
        position: relative;
    }

    .form-group label {
        display: block;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: #374151;
        transition: color 0.3s ease;
    }

    .form-group.focused label {
        color: #3b82f6;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: white;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-group textarea {
        resize: vertical;
        min-height: 120px;
    }

    .char-count {
        text-align: right;
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.5rem;
    }

    .submit-btn {
        width: 100%;
        background: #3b82f6;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
        background: #1d4ed8;
        transform: translateY(-2px);
    }

    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .faq-section {
        margin-top: 80px;
    }

    .faq-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.5rem;
    }

    .faq-item {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        overflow: hidden;
    }

    .faq-question {
        padding: 1.5rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.3s ease;
    }

    .faq-question:hover {
        background: #f9fafb;
    }

    .faq-question h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
    }

    .faq-question i {
        color: #6b7280;
        transition: transform 0.3s ease;
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .faq-answer p {
        padding: 0 1.5rem 1.5rem;
        color: #6b7280;
        line-height: 1.6;
        margin: 0;
    }

    @media (max-width: 768px) {
        .contact-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .faq-grid {
            grid-template-columns: 1fr;
        }

        .contact-info h2,
        .contact-form-container h2 {
            font-size: 1.75rem;
        }

        .social-icons {
            justify-content: center;
        }
    }
`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet); 