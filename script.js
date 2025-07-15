// 图片加载处理
function handleImageLoading() {
    const images = document.querySelectorAll('.template-image img');
    
    images.forEach(img => {
        // 添加加载状态
        img.style.opacity = '0.7';
        img.style.filter = 'grayscale(0.3)';
        
        // 图片加载成功
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'brightness(1) contrast(1)';
            this.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
        });
        
        // 图片加载失败
        img.addEventListener('error', function() {
            console.log('图片加载失败:', this.src);
            // 如果已经是占位符图片，则显示默认样式
            if (this.src.includes('data:image/svg+xml')) {
                this.style.opacity = '0.8';
                this.style.filter = 'grayscale(0.5)';
            }
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片加载处理
    handleImageLoading();
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        });

// 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 模板卡片悬停效果
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .preview-btn, .buy-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 预览按钮跳转功能
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取模板卡片
            const templateCard = this.closest('.template-card');
            const templateTitle = templateCard.querySelector('h3').textContent;
            
            // 根据模板标题确定跳转路径
            let templatePath = '';
            switch(templateTitle) {
                case '现代商务模板':
                    templatePath = '现代商务模板/index.html';
                    break;
                case '科技公司模板':
                    templatePath = '科技公司模板/index.html';
                    break;
                case '教育培训模板':
                    templatePath = '教育培训模板/index.html';
                    break;
                case '健身中心模板':
                    templatePath = '健身中心模板/index.html';
                    break;
                case '个人博客模板':
                    templatePath = '个人博客模板/index.html';
                    break;
                case '电商平台模板':
                    templatePath = '电商平台模板/index.html';
                    break;
                case '创意作品集模板':
                    templatePath = '创意作品集模板/index.html';
                    break;
                case '餐厅美食模板':
                    templatePath = '餐厅美食模板/index.html';
                    break;
                default:
                    alert('模板页面正在开发中...');
                    return;
            }
            
            // 在新窗口中打开模板页面
            window.open(templatePath, '_blank');
        });
    });

    // 搜索功能
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => {
        alert('搜索功能即将推出！');
    });

    // 购物车功能
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        alert('购物车功能即将推出！');
    });

    // 下载按钮功能
    const downloadButtons = document.querySelectorAll('.buy-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 创建下载链接
            const downloadLink = document.createElement('a');
            downloadLink.href = 'website.zip';
            downloadLink.download = 'website.zip';
            
            // 触发下载
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // 显示下载提示
            alert('开始下载 website.zip 文件！');
        });
    });

    // 登录功能
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        alert('登录功能即将推出！');
        });

    // 表单提交
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('感谢您的消息！我们会尽快回复您。');
                this.reset();
        });
}

    // 添加页面加载动画
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        });
    });

// 添加涟漪效果的CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 