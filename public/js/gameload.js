await fetch('/assets/games.json')
    .then((response) => response.json())
    .then((data) => {
        let iframe = document.getElementById('uv-iframe');
        let url = window.location.href;
        let game = url.split('/').pop();
        let gameData = data.find(
            (g) => g.name.toLowerCase().replace(/\s/g, '-') === game
        );
        let gameName = gameData.name.replace(/\s/g, '-').toLowerCase();
        if (gameData.cdn === 'true') {
            //not needed as of now but added for future use
        } else if (gameData.proxy === 'true') {
            window.location.replace('/search/#custom=' + gameData.url);
        } else {
            iframe.src = `/ruby-assets/${gameName}/${gameData.baseFile}`;
        }
    })
    .catch((error) => {
        console.log(error);
    });
