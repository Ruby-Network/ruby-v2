let form = document.getElementById('uv-form');
const adress = document.getElementById('uv-address');
window.onload = function () {
    if (window.location.hash === '#discord') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://discord.com/login';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#youtube') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://youtube.com';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#twitter') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://twitter.com/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#google') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://google.com/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#twitch') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://twitch.tv/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#reddit') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://reddit.com/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#spotify') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://open.spotify.com/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#geforce') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://www.nvidia.com/en-us/geforce-now/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#haikei') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://haikei.xyz';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#pinterest') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://pinterest.com/';
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash === '#github') {
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = 'https://github.com/'
            form.dispatchEvent(new Event('submit'));
        }
    }
    if (window.location.hash.includes('#custom')) {
        // Get the custom URL after the = sign
        let customURL = window.location.hash.split('=')[1];
        if (localStorage.getItem('reloaded') !== 'true') {
            adress.value = customURL;
            form.dispatchEvent(new Event('submit'));
        }
    }
};
