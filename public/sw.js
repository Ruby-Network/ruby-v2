if ('function' === typeof importScripts) {
    importScripts('/dip/dip.worker.js');
    importScripts('/osana/osana.worker.js');
    const sw = new DIPServiceWorker('/dip/dip.worker.js');
    const Osana = new OsanaServiceWorker();
    self.addEventListener('fetch', (event) => {
        if (event.request.url.startsWith(location.origin + '/service/dip/'))
            event.respondWith(sw.fetch(event));
        if (event.request.url.startsWith(location.origin + '/service/~osana/'))
            event.respondWith(Osana.fetch(event));
    });
}
assets = [
    '/',
    '/404',
    '/error',
    '/index',
    '/proxy',
    '/settings',
    '/favicon.ico',
    '/manifest.json',
];
