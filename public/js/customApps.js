let customApps = JSON.parse(localStorage.getItem('customApps'));

if (customApps) {
  customApps.forEach((app) => {
    let appElement = document.createElement('button');
    appElement.setAttribute('class', 'app-button hover:border-[var(--border-color)] hover:rounded-xl hover:border-2 active:brightness-200');
    appElement.innerHTML = `<ol><i class="fa-solid fa-user-plus"></i></ol> <p>${app.name}</p>`;
    //add onclick event to the button
    appElement.onclick = () => {
        localStorage.setItem('reloaded', 'false'); 
        window.location.replace('/search' + '#custom=' + app.url);
    }
    document.getElementById('apps').appendChild(appElement);
  });
}