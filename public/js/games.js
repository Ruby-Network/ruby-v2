await fetch('/assets/games.json')
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('games').innerHTML = data
            .map((game) => {
                //make game.name lowercase and replace spaces with dashes
                let gn = game.name.toLowerCase().replace(/\s/g, '-');
                let tags = game.tags;
                return `
            <div onclick='window.location.href = "/games/${gn}"' data-tag="${tags}" data-game="${gn}" class="game-tile hover:border-[var(--border-color)] hover:rounded-xl hover:border-2">
            <img src="${game.img}" alt="${game.name}" />
            <p> ${game.name} </p>
        </div>
            `;
            })
            .join('');
    })
    .catch((error) => {
        console.log(error);
    });
