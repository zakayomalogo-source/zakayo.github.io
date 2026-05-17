var CACHE_NAME = "zakayo-app-v1";
var FAILI_ZA_KUHIFADHI = [
    "/zakayo.github.io/",
    "/zakayo.github.io/index.html",
    "/zakayo.github.io/portfolio.html",
    "/zakayo.github.io/contact.html",
    "/zakayo.github.io/game.html",
    "/zakayo.github.io/cv.html",
    "/zakayo.github.io/IMG 1234.JPG"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log("Cache imefunguliwa!");
            return cache.addAll(FAILI_ZA_KUHIFADHI);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});