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
var proxiedURL = 'nothing';
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
            if(localStorage.getItem('tabs') === 'true' && localStorage.getItem('gamesBypass') === 'false') {
                location.href = __uv$config.prefix + __uv$config.encodeUrl(url)
                localStorage.setItem('gamesBypass', 'false')
            }
            else {
                iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            }
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
            let url;
            function searchURI(value) {
                url = search(value, searchEngine.value);
            }
            worker().then((event) => {
                let search = document.querySelector('.dipinput');
                let address = document.getElementById('uv-address');
                searchURI(address.value);
                //loadingIframe.classList.remove('dnone');
                let textcolor = getComputedStyle(
                    document.body
                ).getPropertyValue('--text-color');
                //loadingIframe.src = `/loading#${textcolor}`;
                if(localStorage.getItem('tabs') === 'true' && localStorage.getItem('gamesBypass') === 'false') {
                    location.href = __DIP.config.prefix + __DIP.encodeURL(url);
                }
                else {
                    iframe.src = __DIP.config.prefix + __DIP.encodeURL(url);
                }
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
            let url;
            function searchURI(value) {
                url = search(value, searchEngine.value);
            }
            worker().then((event) => {
                let search = document.querySelector('.dipinput');
                let address = document.getElementById('uv-address');
                searchURI(address.value);
                let textcolor = getComputedStyle(
                    document.body
                ).getPropertyValue('--text-color');
                //loadingIframe.src = `/loading#${textcolor}`;
                if(localStorage.getItem('tabs') === 'true' && localStorage.getItem('gamesBypass') === 'false') {
                    location.href = __osana$config.prefix + __osana$config.codec.encode(url);
                }
                else {
                    iframe.src = __osana$config.prefix + __osana$config.codec.encode(url);
                }
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
if (proxytype === 'Aero') {
    document
        .getElementById('uv-form')
        .addEventListener('submit', async (event) => {
            event.preventDefault();
            let url;
            function searchURI(value) {
                url = search(value, searchEngine.value);
            }
            worker().then((event) => {
                let search = document.querySelector('.dipinput');
                let address = document.getElementById('uv-address');
                searchURI(address.value);
                let textcolor = getComputedStyle(
                    document.body
                ).getPropertyValue('--text-color');
                //loadingIframe.src = `/loading#${textcolor}`;
                if(localStorage.getItem('tabs') === 'true' && localStorage.getItem('gamesBypass') === 'false') {
                    location.href = '/go/' + url;
                }
                else {
                    iframe.src = '/go/' + url;
                }
                //iframe.addEventListener('load', function () {
                //loadingIframe.classList.add('dnone');
                document.getElementById('control').classList.remove('dnone');
                iframe.classList.remove('dnone');
                //});
            });
        });
    async function worker() {
        var a = await navigator.serviceWorker.register('/aero-sw.js', {
            scope: '/go/',
            type: 'module',
        });
        return a;
    }
}
if (proxytype === 'Rammerhead') {
    document
        .getElementById('uv-form')
        .addEventListener('submit', async (event) => {
            event.preventDefault();
            let address = document.getElementById('uv-address');
            let topURL = window.location.origin
            let url = search(address.value, searchEngine.value)
            iframe.classList.remove('dnone')
            let endURL = await window.rh.rhInteract(`${topURL}`, `${url}`)
            if(localStorage.getItem('tabs') === 'true' && localStorage.getItem('gamesBypass') === 'false') {
                location.href = endURL.href
            }
            else {
                iframe.src = endURL.href
            }
            document.getElementById('control').classList.remove('dnone')
        })
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
function search(input, template) {
    try {
        return new URL(input).toString();
    } catch (err) {}
    try {
        const url = new URL(`http://${input}`);
        if (url.hostname.includes('.')) return url.toString();
    } catch (err) {}
    return template.replace('%s', encodeURIComponent(input));
}
