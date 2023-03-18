import handle from "./aero/handle.js";
import "./aero/init.js";

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(location.origin + '/go/'))
	    event.respondWith(handle(event).catch(err => new Response(err.stack, { status: 500 })))
});
