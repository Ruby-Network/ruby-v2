await fetch('/assets/games.json')
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('games').innerHTML = data.map((game) => {
            //make game.name lowercase and replace spaces with dashes
            let gn = game.name.toLowerCase().replace(/\s/g, '-');
            return `
            <div onclick='window.location.href = "/games/${gn}"' class="game-tile hover:border-[var(--border-color)] hover:rounded-xl hover:border-2 hover:drop-shadow-[0_12px_12px_var(--text-bg-color)]">
            <img src="${game.img}" alt="${game.name}" />
            <p> ${game.name} </p>
        </div>
            `;
        }
        ).join('');
    })
    .catch((error) => {
        console.log(error);
    });
