// 全局变量
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [
    {
        id: 1,
        name: "企业网站建设套餐",
        price: 9999,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "专业的企业网站建设服务，包含响应式设计、SEO优化、内容管理系统等"
    },
    {
        id: 2,
        name: "移动应用开发",
        price: 19999,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "iOS和Android双平台应用开发，包含UI/UX设计、后端API开发、应用商店发布"
    },
    {
        id: 3,
        name: "数据分析服务",
        price: 5999,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "深度数据分析和商业智能报告，帮助企业做出数据驱动的决策"
    },
    {
        id: 4,
        name: "云服务器托管",
        price: 2999,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "高性能云服务器托管服务，包含24/7技术支持、自动备份、安全防护"
    },
    {
        id: 5,
        name: "网络安全审计",
        price: 7999,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "全面的网络安全审计服务，识别安全漏洞并提供解决方案"
    },
    {
        id: 6,
        name: "IT咨询服务",
        price: 3999,
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        description: "专业的IT战略咨询，帮助企业制定数字化转型路线图"
    }
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadProducts();
    updateCartCount();
    initializeContactForm();
    initializeAnimations();
    initializeSmoothScrolling();
});

// 导航栏功能
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 点击导航链接关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 加载产品
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card fade-in-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> 加入购物车
                </button>
            </div>
        </div>
    `).join('');
}

// 添加到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // 保存到本地存储
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车数量显示
    updateCartCount();
    
    // 显示成功消息
    showNotification('产品已添加到购物车！', 'success');
}

// 更新购物车数量
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // 添加到页面
    document.body.appendChild(notification);

    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 联系表单处理
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加表单验证
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }

        // 模拟表单提交
        showNotification('消息发送成功！我们会尽快回复您。', 'success');
        contactForm.reset();
    });
}

// 初始化动画
function initializeAnimations() {
    // 观察器选项
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // 创建观察器
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, options);

    // 观察所有需要动画的元素
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// 平滑滚动
function initializeSmoothScrolling() {
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
}

// 数字动画
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item h4');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + 
                             (stat.textContent.includes('%') ? '%' : '');
        }, 20);
    });
}

// 当统计部分进入视口时启动数字动画
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// 观察统计部分
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// 购物车页面功能
function loadCartPage() {
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
}

// 显示购物车
function displayCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>购物车为空</h3>
                <p>快去添加一些产品吧！</p>
                <a href="index.html" class="btn btn-primary">继续购物</a>
            </div>
        `;
        return;
    }

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>¥${item.price.toLocaleString()}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">
                ¥${(item.price * item.quantity).toLocaleString()}
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartContainer.innerHTML = `
        <div class="cart-items">
            ${cartHTML}
        </div>
        <div class="cart-summary">
            <h3>总计: ¥${total.toLocaleString()}</h3>
            <button class="btn btn-primary" onclick="checkout()">结账</button>
        </div>
    `;
}

// 更新商品数量
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCart();
        }
    }
}

// 从购物车移除
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    showNotification('产品已从购物车移除', 'info');
}

// 结账功能
function checkout() {
    if (cart.length === 0) {
        showNotification('购物车为空', 'error');
        return;
    }

    // 这里可以集成支付系统
    showNotification('正在跳转到支付页面...', 'info');
    
    // 模拟支付流程
    setTimeout(() => {
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        displayCart();
        showNotification('订单提交成功！', 'success');
    }, 2000);
}

// 页面加载时检查是否需要加载购物车页面
loadCartPage(); 