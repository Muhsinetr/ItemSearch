const CACHE_NAME = 'item-search-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/search1.jpg',
    '/search5.jpg',
    '/script.js',
    '/style.css'
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});