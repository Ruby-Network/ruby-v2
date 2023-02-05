//!TITLE CHANGES
function changeTitle(value) {
    document.title = value;
    localStorage.setItem('title', value);
}
function setTitle() {
    let title = localStorage.getItem('title');
    let titleInput = document.getElementById('title');
    if (title) {
        titleInput.value = title;
        changeTitle(title);
    } else {
        titleInput.value = 'Ruby';
        changeTitle('Ruby');
    }
}
function setTitleElsewhere() {
    let title = localStorage.getItem('title');
    if (title) {
        changeTitle(title);
    } else {
        changeTitle('Ruby');
    }
}
//!END TITLE CHANGES
//!Favicon Changes
function changeFavicon(value) {
    let favicon = document.getElementById('favicon');
    favicon.href = value;
    localStorage.setItem('favicon', value);
}
function setFavicon() {
    let favicon = localStorage.getItem('favicon');
    let faviconInput = document.getElementById('faviconval');
    if (favicon) {
        faviconInput.value = favicon;
        changeFavicon(favicon);
    } else {
        let url = window.location.protocol + '//' + window.location.host;
        faviconInput.value = `${url}/favicon.ico`;
        changeFavicon(`${url}/favicon.ico`);
    }
}
function setFaviconElsewhere() {
    let favicon = localStorage.getItem('favicon');
    if (favicon) {
        changeFavicon(favicon);
    } else {
        let url = window.location.protocol + '//' + window.location.host;
        changeFavicon(`${url}/favicon.ico`);
    }
}
//!END Favicon Changes
//!Proxy Changer
function changeProxy(value) {
    localStorage.setItem('proxy', value);
}
function setProxy() {
    let proxy = localStorage.getItem('proxy');
    let proxyInput = document.getElementById('proxy');
    if (proxy) {
        proxyInput.value = proxy;
        changeProxy(proxy);
    } else {
        proxyInput.value = 'Ultraviolet';
        changeProxy('Ultraviolet');
    }
}
function setProxyElsewhere() {
    let proxy = localStorage.getItem('proxy');
    if (proxy) {
        changeProxy(proxy);
    } else {
        changeProxy('Ultraviolet');
    }
}
//!END Proxy Changer
//!Search Engine Changer
function changeSearchEngine(value) {
    localStorage.setItem('searchEngine', value);
}
function setSearchEngine() {
    let searchEngine = localStorage.getItem('searchEngine');
    let searchEngineInput = document.getElementById('engine');
    if (searchEngine) {
        searchEngineInput.value = searchEngine;
        changeSearchEngine(searchEngine);
    } else {
        searchEngineInput.value = 'Google';
        changeSearchEngine('Google');
    }
}
function setSearchEngineOnPage() {
    let searchEngine = localStorage.getItem('searchEngine');
    let searchEngineInput = document.getElementById('uv-search-engine');
    let searchEngineUrl;
    if (searchEngine) {
        if (searchEngine === 'Google') {
            searchEngineUrl = 'https://www.google.com/search?q=%s';
        } else if (searchEngine === 'Duckduckgo') {
            searchEngineUrl = 'https://duckduckgo.com/?q=%s';
        } else if (searchEngine === 'Bing') {
            searchEngineUrl = 'https://www.bing.com/search?q=%s';
        } else if (searchEngine === 'Yahoo') {
            searchEngineUrl = 'https://search.yahoo.com/search?p=%s';
        } else if (searchEngine === 'Brave') {
            searchEngineUrl = 'https://search.brave.com/search?q=%s';
        } else if (searchEngine === 'Qwant') {
            searchEngineUrl = 'https://www.qwant.com/?q=%s';
        }
        searchEngineInput.value = searchEngineUrl;
    }
}
//!END Search Engine Changer
let autoChanged = localStorage.getItem('autoChanged');
if (!autoChanged) {
    localStorage.setItem('autoChanged', 'null');
}
let none;
//!THEME CHANGER
function changeTheme(value) {
    localStorage.setItem('theme', value);
    document.documentElement.className = value;
    if (
        autoChanged === 'null' ||
        autoChanged === 'true' ||
        (none === 'none' && localStorage.getItem('manualChanged') !== 'true')
    ) {
        if (value === 'space' || value === 'midnight') {
            changeBgeffect('space');
            localStorage.setItem('reload', 'true');
            localStorage.setItem('autoChanged', 'true');
            if (!localStorage.getItem('reloadedonce')) {
                localStorage.setItem('reloadedonce', 'true');
                window.location.reload();
            } else {
                localStorage.removeItem('reloadedonce');
            }
        } else if (value === 'dark') {
            changeBgeffect('multicolor');
            localStorage.setItem('autoChanged', 'true');
            localStorage.setItem('reload', 'true');
            if (!localStorage.getItem('reloadedonce')) {
                localStorage.setItem('reloadedonce', 'true');
                window.location.reload();
            } else {
                localStorage.removeItem('reloadedonce');
            }
        } else if (value === 'terminal') {
            changeBgeffect('terminal');
            localStorage.setItem('autoChanged', 'true');
            localStorage.setItem('reload', 'true');
            if (!localStorage.getItem('reloadedonce')) {
                localStorage.setItem('reloadedonce', 'true');
                window.location.reload();
            } else {
                localStorage.removeItem('reloadedonce');
            }
        } else if (value === 'nord') {
            changeBgeffect('blocks');
            localStorage.setItem('autoChanged', 'true');
            localStorage.setItem('reload', 'true');
            if (!localStorage.getItem('reloadedonce')) {
                localStorage.setItem('reloadedonce', 'true');
                window.location.reload();
            } else {
                localStorage.removeItem('reloadedonce');
            }
        } else if (value === 'earth') {
            changeBgeffect('triangles-and-circles');
            localStorage.setItem('autoChanged', 'true');
            localStorage.setItem('reload', 'true');
            if (!localStorage.getItem('reloadedonce')) {
                localStorage.setItem('reloadedonce', 'true');
                window.location.reload();
            } else {
                localStorage.removeItem('reloadedonce');
            }
        } else {
            changeBgeffect('none');
            if (localStorage.getItem('reload') === 'true') {
                localStorage.setItem('reload', 'false');
                if (!localStorage.getItem('reloadedonce')) {
                    localStorage.setItem('reloadedonce', 'true');
                    localStorage.removeItem('reloadedonce');
                    window.location.reload();
                } else {
                    localStorage.removeItem('reloadedonce');
                }
            }
        }
    }
}
function setTheme() {
    let theme = localStorage.getItem('theme');
    let themeInput = document.getElementById('theme');
    if (theme) {
        themeInput.value = theme;
        changeTheme(theme);
    } else {
        themeInput.value = 'default';
        changeTheme('default');
    }
}
function setThemeElsewhere() {
    let theme = localStorage.getItem('theme');
    if (theme) {
        changeTheme(theme);
    } else {
        changeTheme('default');
    }
}
//!END THEME CHANGER
//!BGEFFECT CHANGER
function changeBgeffect(value, manual) {
    localStorage.setItem('bgeffect', value);
    if (manual === true) {
        localStorage.setItem('autoChanged', 'false');
        localStorage.setItem('manualChanged', 'true');
        window.location.reload();
    }
}
function setBgeffect() {
    let bgeffect = localStorage.getItem('bgeffect');
    let bgeffectInput = document.getElementById('bg-effect');
    if (bgeffect) {
        bgeffectInput.value = bgeffect;
        changeBgeffect(bgeffect);
    } else {
        bgeffectInput.value = 'none';
        changeBgeffect('none');
    }
}
function setBgEffectElsewhere() {
    let bgeffect = localStorage.getItem('bgeffect');
    if (bgeffect) {
        changeBgeffect(bgeffect);
    } else {
        changeBgeffect('none');
    }
}
//!END BGEFFECT CHANGER
//!A:BC
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
//!END A:BC
//!RESET ALL SETTINGS
function resetAll() {
    localStorage.clear();
    window.location.reload();
}
//!END RESET ALL SETTINGS
if (
    window.location.pathname == '/settings' ||
    window.location.pathname == '/settings/'
) {
    setTitle();
    setFavicon();
    setProxy();
    setSearchEngine();
    setTheme();
    setBgeffect();
    if (document.getElementById('bg-effect').value === 'none') {
        localStorage.setItem('autoChanged', 'null');
        localStorage.setItem('manualChanged', 'false');
        none = 'none';
    }
} else if (
    window.location.pathname == '/proxy' ||
    window.location.pathname == '/proxy/'
) {
    setSearchEngineOnPage();
    setTitleElsewhere();
    setFaviconElsewhere();
    setProxyElsewhere();
    setThemeElsewhere();
    setBgEffectElsewhere();
} else {
    setTitleElsewhere();
    setFaviconElsewhere();
    setProxyElsewhere();
    setThemeElsewhere();
    setBgEffectElsewhere();
}
