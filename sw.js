const CACHE_NAME = 'templatehub-v1';
const urlsToCache = [
    '/',
    '/styles.css',
    '/script.js',
    '/index.html',
    '/个人博客模板/index.html',
    '/个人博客模板/styles.css',
    '/个人博客模板/script.js',
    '/健身中心模板/index.html',
    '/创意作品集模板/index.html',
    '/教育培训模板/index.html',
    '/现代商务模板/index.html',
    '/电商平台模板/index.html',
    '/科技公司模板/index.html',
    '/餐厅美食模板/index.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
