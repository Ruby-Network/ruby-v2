if (localStorage.getItem('tabs') === 'true') {
    if (window.location.hash.includes('#link') || window.location.hash.includes('#g')) {
        console.log('App or custom link found! Not Redirecting to /tabs...')
        localStorage.setItem('gamesBypass', 'true')
    }
    else if (window.location.hash.includes('#')) {
        console.log('Custom App most likely not redirecting...')
        localStorage.setItem('gamesBypass', 'false')
    }
    else if (window === window.top) {
        window.location.replace('/tabs')
        localStorage.setItem('gamesBypass', 'false')
    }
    else {
        window.location.replace('/tabbedSearch')
    }
}
