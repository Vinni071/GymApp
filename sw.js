const CACHE_NAME = 'projeto85-app-v7';
const OFFLINE_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./assets/exercises/abdominal-polia.jpg",
  "./assets/exercises/agachamento-smith.jpg",
  "./assets/exercises/cadeira-flexora.jpg",
  "./assets/exercises/chest-press.jpg",
  "./assets/exercises/crucifixo-cabo.jpg",
  "./assets/exercises/crucifixo-inverso.jpg",
  "./assets/exercises/desenvolvimento.jpg",
  "./assets/exercises/elevacao-lateral.jpg",
  "./assets/exercises/elevacao-pelvica.jpg",
  "./assets/exercises/extensora.jpg",
  "./assets/exercises/hack.jpg",
  "./assets/exercises/lateral-push.jpg",
  "./assets/exercises/leg-press.jpg",
  "./assets/exercises/mesa-flexora.jpg",
  "./assets/exercises/panturrilha-pe.jpg",
  "./assets/exercises/panturrilha-sentado.jpg",
  "./assets/exercises/prancha.jpg",
  "./assets/exercises/puxada-frontal.jpg",
  "./assets/exercises/puxada-neutra.jpg",
  "./assets/exercises/remada-apoiada.jpg",
  "./assets/exercises/remada-baixa.jpg",
  "./assets/exercises/remada-unilateral.jpg",
  "./assets/exercises/rosca-alternada.jpg",
  "./assets/exercises/rosca-direta.jpg",
  "./assets/exercises/rosca-martelo.jpg",
  "./assets/exercises/stiff.jpg",
  "./assets/exercises/supino-inclinado-maquina.jpg",
  "./assets/exercises/supino-inclinado.jpg",
  "./assets/exercises/supino-reto.jpg",
  "./assets/exercises/triceps-corda.jpg",
  "./assets/exercises/triceps-polia.jpg",
  "./assets/training.jpg",
  "./assets/animations/0025.gif",
  "./assets/animations/0031.gif",
  "./assets/animations/0155.gif",
  "./assets/animations/0175.gif",
  "./assets/animations/0180.gif",
  "./assets/animations/0198.gif",
  "./assets/animations/0200.gif",
  "./assets/animations/0201.gif",
  "./assets/animations/0285.gif",
  "./assets/animations/0292.gif",
  "./assets/animations/0313.gif",
  "./assets/animations/0314.gif",
  "./assets/animations/0327.gif",
  "./assets/animations/0334.gif",
  "./assets/animations/0405.gif",
  "./assets/animations/0432.gif",
  "./assets/animations/0577.gif",
  "./assets/animations/0585.gif",
  "./assets/animations/0586.gif",
  "./assets/animations/0594.gif",
  "./assets/animations/0599.gif",
  "./assets/animations/0602.gif",
  "./assets/animations/0605.gif",
  "./assets/animations/0739.gif",
  "./assets/animations/0743.gif",
  "./assets/animations/0770.gif",
  "./assets/animations/1299.gif",
  "./assets/animations/2135.gif",
  "./assets/animations/2616.gif"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('projeto85-app-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request)));
});
