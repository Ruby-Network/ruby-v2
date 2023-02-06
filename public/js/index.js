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
            if (
                addr.includes('roblox') ||
                addr.includes('ROBLOX') ||
                addr.includes('Roblox')
            ) {
                iframe.classList.remove('dnone');
                iframe.src =
                    __uv$config.prefix +
                    __uv$config.encodeUrl('https://kxd.fm/roblox');
            }
            if (
                addr.includes('Call of Duty') ||
                addr.includes('call of duty') ||
                addr.includes('Call Of Duty') ||
                addr.includes('call Of Duty') ||
                addr.includes('Call of duty') ||
                addr.includes('call Of duty') ||
                addr.includes('Call Of duty') ||
                addr.includes('call of Duty')
            ) {
                iframe.classList.remove('dnone');
                iframe.src =
                    __uv$config.prefix +
                    __uv$config.encodeUrl(
                        'https://kxd.fm/nowgg/games/cod.html'
                    );
            }
            if (
                addr.includes('Stumble Guys Play Now') ||
                addr.includes('stumble guys play now') ||
                addr.includes('Stumble Guys play now') ||
                addr.includes('stumble guys Play now') ||
                addr.includes('Stumble guys play now') ||
                addr.includes('stumble Guys play now') ||
                addr.includes('Stumble guys Play now') ||
                addr.includes('stumble Guys Play now')
            ) {
                iframe.classList.remove('dnone');
                iframe.src =
                    __uv$config.prefix +
                    __uv$config.encodeUrl(
                        'https://kxd.fm/nowgg/games/stumble-guys.html'
                    );
            }
            if (
                addr.includes('Pixel Gun 3D play now') ||
                addr.includes('pixel gun 3d play now') ||
                addr.includes('Pixel Gun 3d play now') ||
                addr.includes('pixel gun 3D play now') ||
                addr.includes('Pixel gun 3d play now') ||
                addr.includes('pixel Gun 3d play now') ||
                addr.includes('Pixel gun 3D Play now') ||
                addr.includes('pixel Gun 3D Play now')
            ) {
                iframe.classList.remove('dnone');
                iframe.src =
                    __uv$config.prefix +
                    __uv$config.encodeUrl(
                        'https://kxd.fm/nowgg/games/pixel-gun.html'
                    );
            }
            if (
                addr.includes('Android OS Emulator play now') ||
                addr.includes('Android OS Emulator Play Now') ||
                addr.includes('Android OS Emulator Play Now') ||
                addr.includes('Android OS Emulator play now') ||
                addr.includes('Android OS emulator play now') ||
                addr.includes('Android OS emulator Play Now') ||
                addr.includes('Android OS emulator Play Now') ||
                addr.includes('Android OS emulator play now')
            ) {
                iframe.classList.remove('dnone');
                iframe.src =
                    __uv$config.prefix +
                    __uv$config.encodeUrl(
                        'https://kxd.fm/nowgg/games/launcher.html'
                    );
            }
            if (
                addr.includes('now.gg play now') ||
                addr.includes('now.gg play now') ||
                addr.includes('NOW.GG PLAY NOW') ||
                addr.includes('NOW.GG PLAY NOW') ||
                addr.includes('Now.gg play now') ||
                addr.includes('Now.gg play now') ||
                addr.includes('Now.gg Play now') ||
                addr.includes('Now.gg Play now')
            ) {
                window.location = '/games/';
            } else {
                //controlCenter.classList.remove("dnone");
                //urlBar.value = url;
                iframe.classList.remove('dnone');
                iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
                document.getElementById('control').classList.remove('dnone');
                //get the url from the iframe
                // if you change pages in the iframe bring back the loader
            }
        });
}
if (proxytype === 'DIP') {
    document
        .querySelector('.dipform')
        .addEventListener('submit', async (event) => {
            event.preventDefault();

            worker().then((event) => {
                var val = document.querySelector('.dipinput').value;
                let se = document.getElementById('uv-search-engine').value;
                // remove %s from the search engine url
                se = se.replace('%s', '');
                // add the search query to the end of the search engine url
                se = se + val;
                console.log(se);
                if (
                    se.includes('roblox') ||
                    se.includes('ROBLOX') ||
                    se.includes('Roblox') ||
                    se.includes('nowgg') ||
                    se.includes('now.gg')
                ) {
                    window.location = '/errors/nowgg-error.html';
                }
                iframe.classList.remove('dnone');
                iframe.src =
                    window.__DIP.config.prefix + window.__DIP.encodeURL(se);
                //controlCenter.classList.remove("dnone");
                //urlBar.value = se;
                iframe.addEventListener('load', function () {
                    //set urlBar div to the url
                    //   urlBar.value = iframe.contentWindow.location.href;
                    //   urlBar.value = decoded(urlBar.value.split(__DIP.config.prefix).slice(1).join(__DIP.config.prefix))
                });
                if (val.includes('https://') || val.includes('http://')) {
                    if (
                        val === 'https://now.gg' ||
                        val === 'https://www.now.gg' ||
                        val === 'https://roblox.com'
                    ) {
                        window.location = '/errors/nowgg-error.html';
                    }
                    iframe.classList.remove('dnone');
                    iframe.src =
                        window.__DIP.config.prefix +
                        window.__DIP.encodeURL(val);
                    //controlCenter.classList.remove("dnone");
                    //urlBar.value = val;
                    iframe.addEventListener('load', function () {
                        //set urlBar div to the url
                        // urlBar.value = iframe.contentWindow.location.href;
                        // localStorage.setItem("urlPrevious", urlBar.value);
                        // urlBar.value = decoded(urlBar.value.split(__DIP.config.prefix).slice(1).join(__DIP.config.prefix))
                    });
                }
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
                var val = document.querySelector('.dipinput').value;
                let se = document.getElementById('uv-search-engine').value;
                // remove %s from the search engine url
                se = se.replace('%s', '');
                // add the search query to the end of the search engine url
                se = se + val;
                console.log(se);
                if (
                    se === 'https://www.google.com/search?q=roblox' ||
                    se === 'https://www.google.com/search?q=ROBLOX'
                ) {
                    window.location = '/errors/nowgg-error.html';
                }
                iframe.classList.remove('dnone');
                iframe.src =
                    __osana$config.prefix + __osana$config.codec.encode(se);
                //controlCenter.classList.remove("dnone");
                // urlBar.value = se;
                iframe.addEventListener('load', function () {
                    //set urlBar div to the url
                    //   urlBar.value = iframe.contentWindow.location.href;
                    //   localStorage.setItem("urlPrevious", urlBar.value);
                    //   urlBar.value = decoded(urlBar.value.split(__osana$config.prefix).slice(1).join(__osana$config.prefix))
                });
                if (val.includes('https://') || val.includes('http://')) {
                    if (
                        val === 'https://now.gg' ||
                        val === 'https://www.now.gg' ||
                        val === 'https://roblox.com'
                    ) {
                        window.location = '/errors/nowgg-error.html';
                    }
                    iframe.classList.remove('dnone');
                    iframe.src =
                        __osana$config.prefix +
                        __osana$config.codec.encode(val);
                    //controlCenter.classList.remove("dnone");
                    // urlBar.value = val;
                    iframe.addEventListener('load', function () {
                        //set urlBar div to the url
                        //   urlBar.value = iframe.contentWindow.location.href;
                        //   localStorage.setItem("urlPrevious", urlBar.value);
                        //   urlBar.value = decoded(urlBar.value.split(__osana$config.prefix).slice(1).join(__osana$config.prefix))
                    });
                }
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
