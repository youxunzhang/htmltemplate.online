// 关于页面专用功能
document.addEventListener('DOMContentLoaded', function() {
    // 技能条动画
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    
                    // 重置宽度为0
                    progressBar.style.width = '0%';
                    
                    // 动画到目标宽度
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s ease-in-out';
                        progressBar.style.width = width;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    // 统计数字动画
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetNumber = parseInt(statElement.textContent);
                    let currentNumber = 0;
                    
                    const increment = targetNumber / 50; // 50步完成动画
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(timer);
                        }
                        statElement.textContent = Math.floor(currentNumber) + '+';
                    }, 30);
                    
                    observer.unobserve(statElement);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    // 时间线动画
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }

    // 兴趣卡片悬停效果
    function addInterestHoverEffects() {
        const interestItems = document.querySelectorAll('.interest-item');
        
        interestItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            });
        });
    }

    // 教育卡片动画
    function animateEducationCards() {
        const educationItems = document.querySelectorAll('.education-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        educationItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }

    // 联系信息点击复制功能
    function addContactCopyFunction() {
        const contactItems = document.querySelectorAll('.contact-item p');
        
        contactItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function() {
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
            item.title = '点击复制';
        });
    }

    // 初始化所有动画
    function initAnimations() {
        animateSkillBars();
        animateStats();
        animateTimeline();
        animateEducationCards();
        addInterestHoverEffects();
        addContactCopyFunction();
    }

    // 启动动画
    initAnimations();

    // 添加页面滚动进度指示器
    function addScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            indicator.style.width = scrollPercent + '%';
        });
    }

    // 添加滚动指示器
    addScrollIndicator();
});

// 添加关于页面专用样式
const aboutStyles = `
    .about-main {
        padding: 80px 0;
        background: #f9fafb;
    }

    .about-intro {
        margin-bottom: 80px;
    }

    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
    }

    .about-text h2 {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #1f2937;
    }

    .about-text p {
        font-size: 1.125rem;
        color: #6b7280;
        margin-bottom: 1.5rem;
        line-height: 1.7;
    }

    .about-stats {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
    }

    .stat-item {
        text-align: center;
    }

    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #3b82f6;
    }

    .stat-label {
        font-size: 0.875rem;
        color: #6b7280;
    }

    .about-image img {
        width: 100%;
        height: 500px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .skills-section {
        margin-bottom: 80px;
    }

    .section-title {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #1f2937;
    }

    .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .skill-category {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .skill-category h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #1f2937;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .skill-category h3 i {
        color: #3b82f6;
    }

    .skill-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .skill-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .skill-name {
        font-weight: 500;
        color: #374151;
    }

    .skill-bar {
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
    }

    .skill-progress {
        height: 100%;
        background: linear-gradient(90deg, #3b82f6, #1d4ed8);
        border-radius: 4px;
        width: 0%;
    }

    .experience-section {
        margin-bottom: 80px;
    }

    .timeline {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
    }

    .timeline::before {
        content: '';
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #e5e7eb;
    }

    .timeline-item {
        position: relative;
        margin-bottom: 2rem;
        padding-left: 60px;
    }

    .timeline-marker {
        position: absolute;
        left: 11px;
        top: 0;
        width: 20px;
        height: 20px;
        background: #3b82f6;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 0 0 2px #e5e7eb;
    }

    .timeline-content {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .timeline-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }

    .timeline-content h4 {
        font-size: 1rem;
        color: #3b82f6;
        margin-bottom: 1rem;
        font-weight: 500;
    }

    .timeline-content p {
        color: #6b7280;
        line-height: 1.6;
    }

    .education-section {
        margin-bottom: 80px;
    }

    .education-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
    }

    .education-item {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
    }

    .education-icon {
        width: 60px;
        height: 60px;
        background: #3b82f6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .education-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }

    .education-content h4 {
        font-size: 1rem;
        color: #3b82f6;
        margin-bottom: 1rem;
        font-weight: 500;
    }

    .education-content p {
        color: #6b7280;
        line-height: 1.6;
    }

    .interests-section {
        margin-bottom: 80px;
    }

    .interests-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }

    .interest-item {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        text-align: center;
        transition: all 0.3s ease;
    }

    .interest-item i {
        font-size: 2.5rem;
        color: #3b82f6;
        margin-bottom: 1rem;
    }

    .interest-item h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1f2937;
    }

    .interest-item p {
        color: #6b7280;
        line-height: 1.6;
    }

    .contact-section {
        text-align: center;
    }

    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .contact-item {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }

    .contact-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .contact-item i {
        font-size: 2rem;
        color: #3b82f6;
        margin-bottom: 1rem;
    }

    .contact-item h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }

    .contact-item p {
        color: #6b7280;
        font-size: 0.875rem;
    }

    .contact-cta {
        margin-top: 2rem;
    }

    .contact-cta .cta-button {
        display: inline-block;
        background: #3b82f6;
        color: white;
        padding: 15px 30px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .contact-cta .cta-button:hover {
        background: #1d4ed8;
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .about-content {
            grid-template-columns: 1fr;
            text-align: center;
        }

        .about-stats {
            justify-content: center;
        }

        .skills-grid {
            grid-template-columns: 1fr;
        }

        .education-grid {
            grid-template-columns: 1fr;
        }

        .interests-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .contact-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        .section-title {
            font-size: 2rem;
        }

        .about-text h2 {
            font-size: 2rem;
        }
    }
`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = aboutStyles;
document.head.appendChild(styleSheet); 