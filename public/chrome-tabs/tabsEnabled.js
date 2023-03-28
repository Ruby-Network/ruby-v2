if (localStorage.getItem('tabs') === 'true') {
    if (window.location.hash.includes('#link') || window.location.hash.includes('#g')) {
        console.log('App or custom link found! Not Redirecting to /tabs...')
    }
    else if (window.location.hash.includes('#')) {
        console.log('Custom App most likely not redirecting...')
    }
    else if (window === window.top) {
        window.location.replace('/tabs')
    }
    else {
        window.location.replace('/tabbedSearch')
    }
}
