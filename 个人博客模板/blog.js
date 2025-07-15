// 博客页面专用功能
document.addEventListener('DOMContentLoaded', function() {
    // 分类筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // 筛选文章
            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 文章卡片悬停效果
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });

    // 分页功能
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            pageLinks.forEach(l => l.classList.remove('active'));
            // 添加当前active类
            this.classList.add('active');

            // 这里可以添加实际的页面切换逻辑
            // 例如：加载新的文章数据
            showNotification('页面切换功能需要后端支持', 'info');
        });
    });

    // 文章统计功能
    blogCards.forEach(card => {
        const likeBtn = card.querySelector('.fa-heart');
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const likeCount = this.parentElement;
                let currentLikes = parseInt(likeCount.textContent.match(/\d+/)[0]);
                
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked');
                    currentLikes--;
                    this.style.color = '#6b7280';
                } else {
                    this.classList.add('liked');
                    currentLikes++;
                    this.style.color = '#ef4444';
                }
                
                likeCount.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes}`;
            });
        }
    });

    // 搜索功能（可以扩展）
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" placeholder="搜索文章..." id="searchInput">
                <button type="button" id="searchBtn">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        `;

        // 插入到分类筛选之前
        const categoryFilter = document.querySelector('.category-filter');
        categoryFilter.parentNode.insertBefore(searchContainer, categoryFilter);

        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');

        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // 显示所有文章
                blogCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }

            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // 添加搜索功能
    addSearchFunctionality();

    // 文章阅读时间估算
    function addReadingTime() {
        blogCards.forEach(card => {
            const excerpt = card.querySelector('.blog-excerpt').textContent;
            const wordCount = excerpt.split(' ').length;
            const readingTime = Math.ceil(wordCount / 200); // 假设每分钟200字
            
            const readingTimeElement = document.createElement('span');
            readingTimeElement.className = 'reading-time';
            readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} 分钟`;
            
            const blogMeta = card.querySelector('.blog-meta');
            blogMeta.appendChild(readingTimeElement);
        });
    }

    // 添加阅读时间
    addReadingTime();

    // 无限滚动功能（可选）
    function addInfiniteScroll() {
        let isLoading = false;
        
        window.addEventListener('scroll', function() {
            if (isLoading) return;
            
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            if (scrollTop + windowHeight >= documentHeight - 100) {
                isLoading = true;
                
                // 模拟加载更多文章
                setTimeout(() => {
                    // 这里可以添加实际的加载逻辑
                    showNotification('加载更多文章功能需要后端支持', 'info');
                    isLoading = false;
                }, 1000);
            }
        });
    }

    // 添加无限滚动（可选）
    // addInfiniteScroll();
});

// 添加博客页面专用样式
const blogStyles = `
    .page-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 120px 0 80px;
        text-align: center;
    }

    .page-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .page-subtitle {
        font-size: 1.25rem;
        opacity: 0.9;
    }

    .blog-main {
        padding: 80px 0;
        background: #f9fafb;
    }

    .category-filter {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    }

    .filter-btn {
        background: white;
        border: 2px solid #e5e7eb;
        color: #6b7280;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
    }

    .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .blog-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }

    .blog-image {
        height: 200px;
        overflow: hidden;
    }

    .blog-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .blog-card:hover .blog-image img {
        transform: scale(1.05);
    }

    .blog-content {
        padding: 1.5rem;
    }

    .blog-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        align-items: center;
    }

    .blog-category {
        background: #3b82f6;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 500;
    }

    .blog-date {
        color: #6b7280;
    }

    .reading-time {
        color: #6b7280;
        margin-left: auto;
    }

    .blog-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1f2937;
        line-height: 1.4;
    }

    .blog-excerpt {
        color: #6b7280;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .blog-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .blog-stats {
        display: flex;
        gap: 1rem;
        color: #6b7280;
        font-size: 0.875rem;
    }

    .blog-stats span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .blog-stats span:hover {
        color: #3b82f6;
    }

    .pagination {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 3rem;
    }

    .page-link {
        display: inline-block;
        padding: 10px 15px;
        background: white;
        color: #6b7280;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
        border: 1px solid #e5e7eb;
    }

    .page-link:hover,
    .page-link.active {
        background: #3b82f6;
        color: white;
        border-color: #3b82f6;
    }

    .search-container {
        margin-bottom: 2rem;
        display: flex;
        justify-content: center;
    }

    .search-box {
        display: flex;
        max-width: 400px;
        width: 100%;
    }

    .search-box input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-right: none;
        border-radius: 8px 0 0 8px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .search-box input:focus {
        border-color: #3b82f6;
    }

    .search-box button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 0 8px 8px 0;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .search-box button:hover {
        background: #1d4ed8;
    }

    @media (max-width: 768px) {
        .page-title {
            font-size: 2rem;
        }

        .blog-grid {
            grid-template-columns: 1fr;
        }

        .category-filter {
            gap: 0.5rem;
        }

        .filter-btn {
            padding: 8px 16px;
            font-size: 0.875rem;
        }

        .blog-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }
    }
`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = blogStyles;
document.head.appendChild(styleSheet); 