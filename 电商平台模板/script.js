// 全局变量
let products = [];
let cart = [];
let currentUser = null;
let currentStep = 1;

// 产品数据
const productData = [
    {
        id: 1,
        name: "MacBook Pro 14英寸",
        category: "electronics",
        price: 14999,
        originalPrice: 16999,
        rating: 4.8,
        reviews: 1250,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badge: "热销",
        description: "搭载M2 Pro芯片，14英寸Liquid视网膜XDR显示屏"
    },
    {
        id: 2,
        name: "iPhone 15 Pro",
        category: "electronics",
        price: 7999,
        originalPrice: 8999,
        rating: 4.9,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badge: "新品",
        description: "A17 Pro芯片，钛金属设计，专业级相机系统"
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        category: "fashion",
        price: 899,
        originalPrice: 1099,
        rating: 4.6,
        reviews: 856,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badge: "限时",
        description: "舒适缓震，时尚设计，适合日常运动"
    },
    {
        id: 4,
        name: "Levi's 501经典牛仔裤",
        category: "fashion",
        price: 599,
        originalPrice: 799,
        rating: 4.5,
        reviews: 634,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "经典直筒版型，100%纯棉面料"
    },
    {
        id: 5,
        name: "IKEA MALM床架",
        category: "home",
        price: 1299,
        originalPrice: 1599,
        rating: 4.4,
        reviews: 423,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badge: "包邮",
        description: "简约现代设计，优质实木材质"
    },
    {
        id: 6,
        name: "Philips Hue智能灯泡套装",
        category: "home",
        price: 399,
        originalPrice: 499,
        rating: 4.7,
        reviews: 298,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "1600万种颜色，语音控制，节能环保"
    },
    {
        id: 7,
        name: "La Mer面霜",
        category: "beauty",
        price: 2899,
        originalPrice: 3299,
        rating: 4.8,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        badge: "奢华",
        description: "深海巨藻精华，深层滋养修复"
    },
    {
        id: 8,
        name: "Dyson Airwrap卷发棒",
        category: "beauty",
        price: 3999,
        originalPrice: 4599,
        rating: 4.6,
        reviews: 789,
        image: "https://images.unsplash.com/photo-1522338140263-f46f5913618a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "多合一造型工具，智能温控技术"
    }
];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = productData;
    loadProducts();
    setupEventListeners();
    updateCartCount();
}

// 设置事件监听器
function setupEventListeners() {
    // 导航栏事件
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
    document.getElementById('closeCart').addEventListener('click', toggleCart);
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    
    // 模态框事件
    document.getElementById('closeLoginModal').addEventListener('click', hideLoginModal);
    document.getElementById('closeRegisterModal').addEventListener('click', hideRegisterModal);
    document.getElementById('closeCheckoutModal').addEventListener('click', hideCheckoutModal);
    
    // 表单事件
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    document.getElementById('showRegister').addEventListener('click', showRegisterModal);
    document.getElementById('showLogin').addEventListener('click', showLoginModal);
    
    // 搜索和筛选
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('sortFilter').addEventListener('change', sortProducts);
    
    // 分类卡片事件
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });
    
    // 结算事件
    document.getElementById('checkoutBtn').addEventListener('click', showCheckoutModal);
    
    // 点击模态框外部关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
}

// 加载产品
function loadProducts(productsToShow = products) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// 创建产品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-category">${getCategoryName(product.category)}</p>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">¥${product.price.toLocaleString()}</span>
                <span class="original-price">¥${product.originalPrice.toLocaleString()}</span>
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                加入购物车
            </button>
        </div>
    `;
    
    return card;
}

// 生成星级评分
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        'electronics': '电子产品',
        'fashion': '时尚服饰',
        'home': '家居生活',
        'beauty': '美妆护肤'
    };
    return categories[category] || category;
}

// 搜索功能
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    loadProducts(filteredProducts);
}

// 筛选产品
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filteredProducts = products;
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    sortProducts(filteredProducts, sortFilter);
}

// 按分类筛选
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    filterProducts();
    scrollToProducts();
}

// 排序产品
function sortProducts(productsToSort = products, sortType = 'default') {
    let sortedProducts = [...productsToSort];
    
    switch (sortType) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    loadProducts(sortedProducts);
}

// 购物车功能
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
    
    updateCartCount();
    updateCartDisplay();
    showNotification('商品已添加到购物车');
}

// 更新购物车数量
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// 更新购物车显示
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">购物车是空的</p>';
        cartTotal.textContent = '¥0.00';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">删除</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `¥${total.toLocaleString()}`;
}

// 更新商品数量
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        updateCartDisplay();
    }
}

// 从购物车移除
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
    showNotification('商品已从购物车移除');
}

// 切换购物车侧边栏
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    updateCartDisplay();
}

// 用户登录功能
function showLoginModal() {
    document.getElementById('loginModal').classList.add('show');
}

function hideLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function showRegisterModal() {
    hideLoginModal();
    document.getElementById('registerModal').classList.add('show');
}

function hideRegisterModal() {
    document.getElementById('registerModal').classList.remove('show');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // 模拟登录验证
    if (email && password) {
        currentUser = { email, name: email.split('@')[0] };
        hideLoginModal();
        showNotification('登录成功');
        updateUserInterface();
    } else {
        showNotification('请输入邮箱和密码', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('密码不匹配', 'error');
        return;
    }
    
    if (name && email && password) {
        currentUser = { email, name };
        hideRegisterModal();
        showNotification('注册成功');
        updateUserInterface();
    } else {
        showNotification('请填写所有字段', 'error');
    }
}

// 更新用户界面
function updateUserInterface() {
    const loginBtn = document.getElementById('loginBtn');
    if (currentUser) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
    } else {
        loginBtn.innerHTML = '<i class="fas fa-user"></i>';
    }
}

// 结算功能
function showCheckoutModal() {
    if (cart.length === 0) {
        showNotification('购物车是空的', 'error');
        return;
    }
    
    if (!currentUser) {
        showNotification('请先登录', 'error');
        showLoginModal();
        return;
    }
    
    document.getElementById('checkoutModal').classList.add('show');
    updateOrderSummary();
}

function hideCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('show');
    currentStep = 1;
    updateCheckoutSteps();
}

function nextStep(step) {
    if (step === 2) {
        const firstName = document.getElementById('firstName').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        if (!firstName || !phone || !address) {
            showNotification('请填写完整的收货信息', 'error');
            return;
        }
    }
    
    currentStep = step;
    updateCheckoutSteps();
}

function prevStep(step) {
    currentStep = step;
    updateCheckoutSteps();
}

function updateCheckoutSteps() {
    // 隐藏所有步骤内容
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // 显示当前步骤内容
    document.getElementById(`step${currentStep}`).classList.remove('hidden');
    
    // 更新步骤指示器
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
}

function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>¥${(item.price * item.quantity).toLocaleString()}</span>
        `;
        orderItems.appendChild(orderItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotal.textContent = `¥${total.toLocaleString()}`;
}

function placeOrder() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // 模拟订单提交
    showNotification('订单提交中...', 'info');
    
    setTimeout(() => {
        showNotification('订单提交成功！', 'success');
        hideCheckoutModal();
        
        // 清空购物车
        cart = [];
        updateCartCount();
        updateCartDisplay();
        toggleCart();
        
        // 模拟订单号
        const orderNumber = 'ORD' + Date.now().toString().slice(-8);
        showNotification(`订单号: ${orderNumber}`, 'success');
    }, 2000);
}

// 工具函数
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function showNotification(message, type = 'success') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : type === 'info' ? '#3498db' : '#27ae60'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 响应式导航
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
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
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}); 