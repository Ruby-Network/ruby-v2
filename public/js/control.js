// let refresh = document.getElementById('refresh-control');
// let back = document.getElementById('back-control');
// let forward = document.getElementById('forward-control');
// let fullscreen = document.getElementById('fullscreen-control');
// let exit = document.getElementById('exit-control');

function refreshIframe() {
    iframe.contentWindow.location.reload();
}
function backIframe() {
    iframe.contentWindow.history.back();
}
function forwardIframe() {
    iframe.contentWindow.history.forward();
}
//listen for a hover on the top of the iframe when the iframe is fullscreen
//if the user hovers over the top of the iframe then show the controls
//if the user hovers out of the top of the iframe then hide the controls
// let control = document.getElementById('exit-iframe');
// let fullscreen = localStorage.getItem('fulls||ruby');
// if (fullscreen === 'true') {
//     let iframe = document.getElementById('uv-iframe');
//     iframe.addEventListener('mouseover', function () {
//         control.classList.remove('dnone');
//     });
//     iframe.addEventListener('mouseout', function () {
//         control.classList.add('dnone');
//     });
// }
function fullScreenIframe(value, fullscreenBehavior) {
    if (fullscreenBehavior === 'content') {
        if (value === true) {
            let iframe = document.getElementById('uv-iframe');
            localStorage.setItem('fulls||ruby', 'true');
            iframe.requestFullscreen();
        } else if (value === false) {
            localStorage.setItem('fulls||ruby', 'false');
            document.exitFullscreen();
        }
    } else {
        if (value === true) {
            let iframe = document.getElementById('uv-iframe');
            localStorage.setItem('fulls||ruby', 'true');
            //set to position absolute
            iframe.style.position = 'absolute';
            //set to top left corner
            iframe.style.top = '0';
            iframe.style.left = '0';
            //set to full width and height
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            //set z-index to 9999
            iframe.style.zIndex = '9999';
            //add a transition
            iframe.style.transition = 'all 0.5s ease-in-out';
        } else if (value === false) {
            let iframe = document.getElementById('uv-iframe');
            localStorage.setItem('fulls||ruby', 'false');
            //set styles to height: calc(100% - 4rem);width: 100%;border: none;position: fixed;top: 4rem;right: 0;left: 0;bottom: 0;border: none; background: var(--bg-color);
            iframe.style.height = 'calc(100% - 4rem)';
            iframe.style.width = '100%';
            iframe.style.border = 'none';
            iframe.style.position = 'fixed';
            iframe.style.top = '4rem';
            iframe.style.right = '0';
            iframe.style.left = '0';
            iframe.style.bottom = '0';
            iframe.style.border = 'none';
            iframe.style.background = 'var(--bg-color)';
            iframe.style.transition = 'all 0.5s ease-in-out';
        }
    }
}
function fullscreenIframe() {
    let fullscreenBehavior = localStorage.getItem('fullscreenBehavior');
    if (fullscreenBehavior === 'true') {
        fullScreenIframe(true);
    } else if (fullscreenBehavior === 'false') {
        fullScreenIframe(true, 'content');
    } else {
        localStorage.setItem('fullscreenBehavior', 'true');
        fullScreenIframe(true);
    }
}
function exitIframe() {
    window.location.reload();
    localStorage.setItem('reloaded', 'true');
}
