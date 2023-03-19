function search_games(input) {
  let x = document.getElementsByClassName('game-tile');
  for (i = 0; i < x.length; i++) {
    let y = document.getElementsByClassName("game-tile");
    switch(x[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
        case false:
            x[i].style.display = "none";
            break;
        case true:
            x[i].style.display = '';
            break;
    }
  }
}
