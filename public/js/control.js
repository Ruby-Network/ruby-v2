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
function fullscreenIframe() {
    localStorage.setItem('fullscreen', 'true');
    iframe.requestFullscreen();
}
function exitIframe() {
    window.location.reload();
    localStorage.setItem('reloaded', 'true');
}
