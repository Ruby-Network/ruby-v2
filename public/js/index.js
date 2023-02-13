/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById('uv-search-engine');
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById('uv-error');
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById('uv-error-code');
const iframe = document.getElementById('uv-iframe');
let proxytype = localStorage.getItem('proxy');
let currenturl = window.location.href;
let controlCenter = document.getElementById('iframe-control');
let urlBar = document.getElementById('url-bar');
//let loader = document.getElementById("loader");
// import { proxyApi, prefix } from "/aero/config.js";

// // import ProxyManager from "./sdk/ProxyManager.js";
if (proxytype === 'Ultraviolet') {
    document
        .getElementById('uv-form')
        .addEventListener('submit', async (event) => {
            //console.error(event)
            event.preventDefault();
            const address = document.getElementById('uv-address');
            try {
                await registerSW();
                console.log('Registered SW');
            } catch (err) {
                error.textContent = 'Failed to register service worker.';
                errorCode.textContent = err.toString();
                throw err;
            }
            const url = search(address.value, searchEngine.value);
            const addr = address.value;
            const toup = url.toUpperCase();
            iframe.classList.remove('dnone');
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            document.getElementById('control').classList.remove('dnone');
        });
}
if (proxytype === 'DIP') {
    document
        .querySelector('.dipform')
        .addEventListener('submit', async (event) => {
            event.preventDefault();

            worker().then((event) => {
                let search = document.querySelector('.dipinput');
                let searchURL =
                    document.getElementById('uv-search-engine').value;
                searchURL = searchURL.replace('%s', '');
                let location;
                //if search.value is a url then set location to that url without using .includes
                if (
                    search.value.includes('https://') ||
                    search.value.includes('http://')
                ) {
                    location = search.value;
                } else {
                    location = searchURL + encodeURIComponent(search.value);
                }
                iframe.classList.remove('dnone');
                iframe.src =
                    window.__DIP.config.prefix +
                    window.__DIP.encodeURL(location);
                document.getElementById('control').classList.remove('dnone');
            });
        });
    async function worker() {
        var a = await navigator.serviceWorker.register('/sw.js', {
            scope: '/service',
        });
        return a;
    }
}
if (proxytype === 'Osana') {
    document
        .getElementById('uv-form')
        .addEventListener('submit', async (event) => {
            event.preventDefault();
            worker().then((event) => {
                let search = document.querySelector('.dipinput');
                let searchURL =
                    document.getElementById('uv-search-engine').value;
                searchURL = searchURL.replace('%s', '');
                let location;
                //if search.value is a url then set location to that url without using .includes
                if (
                    search.value.includes('https://') ||
                    search.value.includes('http://')
                ) {
                    location = search.value;
                } else {
                    console.log(search.value);
                    location = searchURL + encodeURIComponent(search.value);
                }
                iframe.classList.remove('dnone');
                iframe.src = `${
                    __osana$config.prefix
                }${__osana$config.codec.encode(location)}`;
                console.log(__osana$config.codec.encode(location));
                document.getElementById('control').classList.remove('dnone');
            });
        });
    async function worker() {
        var a = await navigator.serviceWorker.register('/sw.js', {
            scope: '/service/',
        });
        return a;
    }
}
function decoded(str) {
    if (str.charAt(str.length - 1) == '/') str = str.slice(0, -1);
    return decodeURIComponent(str)
        .split('')
        .map((char, ind) =>
            ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
        )
        .join('');
}
