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
const loadingIframe = document.getElementById('load-iframe');
let proxytype = localStorage.getItem('proxy');
let currenturl = window.location.href;
let controlCenter = document.getElementById('iframe-control');
let urlBar = document.getElementById('url-bar');
//let loader = document.getElementById("loader");
// import { proxyApi, prefix } from "/aero/config.js";
function loading(textcolor) {
    iframe.src = `/loading#${textcolor}`;
}
window.addEventListener('load', () => {
    loading(getComputedStyle(document.body).getPropertyValue('--text-color'));
});
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
            //loadingIframe.classList.remove('dnone');
            //loadingIframe.src = `/loading#${textcolor}`;
            // blob = __uv$config.prefix + __uv$config.encodeUrl(url);
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            //iframe.addEventListener('load', function () {
            //loadingIframe.classList.add('dnone');
            document.getElementById('control').classList.remove('dnone');
            iframe.classList.remove('dnone');
            //});
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
                //loadingIframe.classList.remove('dnone');
                let textcolor = getComputedStyle(
                    document.body
                ).getPropertyValue('--text-color');
                //loadingIframe.src = `/loading#${textcolor}`;
                iframe.src =
                    window.__DIP.config.prefix +
                    window.__DIP.encodeURL(location);
                //iframe.addEventListener('load', function () {
                //loadingIframe.classList.add('dnone');
                document.getElementById('control').classList.remove('dnone');
                iframe.classList.remove('dnone');
                //});
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
                //loadingIframe.classList.remove('dnone');
                let textcolor = getComputedStyle(
                    document.body
                ).getPropertyValue('--text-color');
                //loadingIframe.src = `/loading#${textcolor}`;
                iframe.src = `${
                    __osana$config.prefix
                }${__osana$config.codec.encode(location)}`;
                //iframe.addEventListener('load', function () {
                //loadingIframe.classList.add('dnone');
                document.getElementById('control').classList.remove('dnone');
                iframe.classList.remove('dnone');
                //});
            });
        });
    async function worker() {
        var a = await navigator.serviceWorker.register('/sw.js', {
            scope: '/service/',
        });
        return a;
    }
}
if (proxytype === 'STOMP') {
    const config = {
        bare_server: '/bare/',
        directory: '/stomp/',
    };
    if (location.protocol === 'http:') {
        config.loglevel = StompBoot.LOG_TRACE;
        config.codec = StompBoot.CODEC_PLAIN;
    } else {
        config.loglevel = StompBoot.LOG_ERROR;
        config.codec = StompBoot.CODEC_XOR;
    }
    const boot = new StompBoot(config);

    const search = new StompBoot.SearchBuilder(document.getElementById('uv-search-engine').value);

    document
        .getElementById('uv-form')
        .addEventListener('submit', async (event) => {
            event.preventDefault();
            boot.ready.then(() => {
		document.getElementById('control').classList.remove('dnone');
                iframe.classList.remove('dnone');
                iframe.src = boot.html(search.query(document.querySelector('.dipinput').value));
            })
        });
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
