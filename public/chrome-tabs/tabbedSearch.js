if (window === window.top) {
    window.location.replace('/search')
}
if (!localStorage.getItem('tabs') || localStorage.getItem('tabs') !== 'true') {
    window.location.replace('/search')
}
