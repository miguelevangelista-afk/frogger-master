/* Service worker: caches the whole game so it works offline. */
var CACHE = 'frogger-v18';   // change this number when you update the game files
var FILES = [
    "./",
    "index.html",
    "manifest.json",
    "css/style.css",
    "js/profile.js",
    "js/resources.js",
    "js/engine.js",
    "js/app.js",
    "js/lootbox.js",
    "js/shop.js",
    "js/boxes.js",
    "js/menu.js",
    "js/rewards.js",
    "js/maps.js",
    "js/enemies.js",
    "js/level.js",
    "js/boss.js",
    "js/gameover.js",
    "js/fx.js",
    "icons/icon-192.png",
    "images/boss/ogre-idle.png",
    "images/boss/ogre-attack.png",
    "images/boss/ogre-hurt.png",
    "images/boss/golem.png",
    "images/boss/btn-sword.png",
    "icons/icon-512.png",
    "images/Gem Blue.png",
    "images/Gem Green.png",
    "images/Gem Orange.png",
    "images/Heart.png",
    "images/Key.png",
    "images/Rock.png",
    "images/Selector.png",
    "images/Star.png",
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png",
    "images/enemy-bug.png",
    "images/enemy-dragon.png",
    "images/enemy-reaper.png",
    "images/char-dino.png",
    "images/oneup-text.png",
    "images/oneup-arrow.png",
    "images/grass-block.png",
    "images/stone-block.png",
    "images/water-block.png",
    "images/maps/desert-grass.png",
    "images/maps/desert-stone.png",
    "images/maps/desert-water.png",
    "images/maps/snow-grass.png",
    "images/maps/snow-stone.png",
    "images/maps/snow-water.png",
    "images/maps/volcano-grass.png",
    "images/maps/volcano-stone.png",
    "images/maps/volcano-water.png",
    "images/arrow-up.png",
    "images/arrow-down.png",
    "images/arrow-left.png",
    "images/arrow-right.png",
    "images/ui-victory.png",
    "images/ui-defeat.png",
    "images/snorlax/frame-0.png",
    "images/snorlax/frame-1.png",
    "images/snorlax/frame-2.png",
    "images/snorlax/frame-3.png",
    "images/snorlax/frame-4.png",
    "images/snorlax/frame-5.png",
    "images/snorlax/frame-6.png",
    "images/snorlax/frame-7.png",
    "images/snorlax/frame-8.png",
    "images/snorlax/frame-9.png",
    "images/snorlax/frame-10.png",
    "images/snorlax/frame-11.png",
    "images/chars/sheep.png",
    "images/chars/cow.png",
    "images/chars/pompom.png",
    "images/chars/shiba.png",
    "images/chars/horse.png",
    "images/chars/frog.png",
    "images/chars/pinkgirl.png",
    "images/chars/nun.png",
    "images/chars/turtle.png",
    "images/chars/knight.png",
    "images/chars/hood.png"
];

self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }));
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    e.waitUntil(caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(k) { return k !== CACHE; })
                               .map(function(k) { return caches.delete(k); }));
    }));
    self.clients.claim();
});

// Network first (so edits show up right away), cache as the offline fallback
self.addEventListener('fetch', function(e) {
    if (e.request.method !== 'GET') { return; }
    e.respondWith(fetch(e.request).then(function(res) {
        if (res.ok && new URL(e.request.url).origin === self.location.origin) {
            var copy = res.clone();
            caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        }
        return res;
    }).catch(function() { return caches.match(e.request); }));
});
