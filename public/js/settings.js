let url = window.location.protocol + '//' + window.location.host;
let favicon = document.getElementById('favicon');
let bgeffectInput = document.getElementById('bg-effect');

function changeTitle(title) {
    document.title = title;
    localStorage.setItem('title', title);
}
switch (localStorage.getItem('title')) {
    case null:
        localStorage.setItem('title', 'Ruby');
        document.title = 'Ruby';
        break;
    case '':
        localStorage.setItem('title', 'Ruby');
        document.title = 'Ruby';
        break;
    default:
        document.title = localStorage.getItem('title');
}

function changeFavicon(value) {
    favicon.href = value;
    localStorage.setItem('favicon', value);
}
switch (localStorage.getItem('favicon')) {
    case null:
        localStorage.setItem('favicon', url + '/favicon.ico');
        favicon.href = url + '/favicon.ico';
        break;
    case '':
        localStorage.setItem('favicon', url + '/favicon.ico');
        favicon.href = url + '/favicon.ico';
        break;
    default:
        favicon.href = localStorage.getItem('favicon');
}

function changeProxy(proxy) {
    localStorage.setItem('proxy', proxy);
}
switch (localStorage.getItem('proxy')) {
    case null:
        localStorage.setItem('proxy', 'Ultraviolet');
        break;
}

function changeSearchEngine(engineType) {
    localStorage.setItem('searchEngine', engineType);
}
switch (localStorage.getItem('searchEngine')) {
    case null:
        localStorage.setItem('searchEngine', 'Google');
        break;
}

function changeTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
}
switch (localStorage.getItem('theme')) {
    case null:
        localStorage.setItem('theme', 'default');
        document.documentElement.className = 'Default';
        break;
    default:
        document.documentElement.className = localStorage.getItem('theme');
}

function changeBgEffect(bg, manual) {
    if (manual === true) {
        localStorage.setItem('manual', true);
    }
    localStorage.setItem('bgeffect', bg);
    window.location.reload();
}
switch (localStorage.getItem('bgeffect')) {
    case null:
        localStorage.setItem('bgeffect', 'none');
        break;
}

function changeClickoff(value) {
    localStorage.setItem('clickoff', value);
    window.location.reload();
}
switch (localStorage.getItem('clickoff')) {
    case null:
        localStorage.setItem('clickoff', false);
        break;
    case 'true':
        document.addEventListener('visibilitychange', handleClickOff);
}
function handleClickOff() {
    let maskedTitle = 'Google';
    let maskedFavicon = 'https://google.com/favicon.ico';
    let title = localStorage.getItem('title');
    let favicon = localStorage.getItem('favicon');
    switch (localStorage.getItem('clickedoff')) {
        case undefined:
        case null:
        case 'false':
            document.title = maskedTitle;
            document.getElementById('favicon').href = maskedFavicon;
            localStorage.setItem('clickedoff', true);
            break;
        default:
            document.title = title;
            document.getElementById('favicon').href = favicon;
            localStorage.setItem('clickedoff', false);
    }
}

function setPassword(value) {
    if (window.confirm('Are you sure you want to set a password?')) {
        localStorage.setItem('password', value);
        window.location.reload();
    } else {
        alert('OK then, your password will not be set.');
    }
}

function changeFullscreen(value) {
    localStorage.setItem('fullscreenBehavior', value);
}
switch (localStorage.getItem('fullscreenBehavior')) {
    case null:
        localStorage.setItem('fullscreenBehavior', true);
}

function aboutBlank() {
    window.location.replace('https://google.com');
    const win = window.open();
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    const url = window.location.href;
    iframe.src = url;
    win.document.body.appendChild(iframe);
}

function changeAds(value) {
    localStorage.setItem('adsallowed', value);
    window.location.replace('/disable-ads');
}
switch (localStorage.getItem('adsallowed')) {
    case null:
        localStorage.setItem('adsallowed', false);
}

function resetAll() {
    localStorage.removeItem('title');
    localStorage.removeItem('favicon');
    localStorage.removeItem('proxy');
    localStorage.removeItem('searchEngine');
    localStorage.removeItem('theme');
    localStorage.removeItem('bgeffect');
    localStorage.removeItem('clickoff');
    localStorage.removeItem('fullscreenBehavior');
    document.cookie =
        'allowads=; Max-Age=0; path=/; domain=' + window.location.hostname;
    localStorage.removeItem('adsallowed');
    localStorage.removeItem('clickedoff');
    window.location.reload();
}

function setSettingsValues() {
    let titleVal = document.getElementById('title');
    let faviconVal = document.getElementById('faviconval');
    let proxyVal = document.getElementById('proxy');
    let searchEngineVal = document.getElementById('engine');
    let themeVal = document.getElementById('theme');
    let bgEffectVal = document.getElementById('bg-effect');
    let clickoffVal = document.getElementById('clickoff');
    let fullscreenVal = document.getElementById('fullscreen');
    let adbehaviorVal = document.getElementById('adbehavior');
    titleVal.value = localStorage.getItem('title');
    faviconVal.value = localStorage.getItem('favicon');
    proxyVal.value = localStorage.getItem('proxy');
    searchEngineVal.value = localStorage.getItem('searchEngine');
    themeVal.value = localStorage.getItem('theme');
    bgEffectVal.value = localStorage.getItem('bgeffect');
    clickoffVal.value = localStorage.getItem('clickoff');
    fullscreenVal.value = localStorage.getItem('fullscreenBehavior');
    adbehaviorVal.value = localStorage.getItem('adsallowed');
}
function setSearchEngine() {
    let searchEngineVal = document.getElementById('uv-search-engine');
    switch (localStorage.getItem('searchEngine')) {
        case 'Google':
            searchEngineVal.value = 'https://google.com/search?q=%s';
            break;
        case 'Duckduckgo':
            searchEngineVal.value = 'https://duckduckgo.com/?q=%s';
            break;
        case 'Bing':
            searchEngineVal.value = 'https://www.bing.com/search?q=%s';
            break;
        case 'Yahoo':
            searchEngineVal.value = 'https://search.yahoo.com/search?p=%s';
            break;
        case 'Brave':
            searchEngineVal.value = 'https://search.brave.com/search?q=%s';
            break;
        case 'Qwant':
            searchEngineVal.value = 'https://www.qwant.com/?q=%s';
            break;
    }
}
switch (window.location.pathname) {
    case '/settings':
    case '/settings/':
        setSettingsValues();
        localStorage.setItem('clickedoff', false);
        break;
    case '/search':
    case '/search/':
        setSearchEngine();
        localStorage.setItem('clickedoff', false);
        break;
    default:
        localStorage.setItem('clickedoff', false);
}
