import handle from './aero/handle.js';
import './aero/init.js';

addEventListener('fetch', (event) => {
    if (event.request.url.startsWith(location.origin + '/go/'))
        event.respondWith(handle(event));
});
