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
    let fullscreenBehavior = localStorage.getItem('fullscreenBehavior');
    if (fullscreenBehavior === 'true') {
        iframe.requestFullscreen();
    } else if (fullscreenBehavior === 'false') {
        let iframe = document.getElementById('uv-iframe');
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
    } else {
        localStorage.setItem('fullscreenBehavior', 'true');
        iframe.requestFullscreen();
    }
}
function exitIframe() {
    window.location.reload();
    localStorage.setItem('reloaded', 'true');
}
