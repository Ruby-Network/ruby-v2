const searchForm = document.getElementById('uv-form');
const searchInput = document.getElementById('uv-address');
const suggestionsData = document.getElementById('suggestions-data');
const suggestionsContainer = document.getElementById('suggestions');

searchInput.addEventListener('input', async (event) => {
    // Get the search query from the input field
    const query = event.target.value;

    try {
        const response = await fetch(`/suggest?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data[1]) {
            let suggestions = data[1];
            suggestionsData.innerHTML = '';
            suggestions.forEach((suggestions) => {
                const li = document.createElement('li');
                li.textContent = suggestions;
                li.setAttribute('data-value', suggestions);
                suggestionsData.appendChild(li);
            });
            suggestionsContainer.classList.remove('dnone');
            searchInput.style.borderRadius = '0.75rem 0.75rem 0 0';
            suggestionsData.addEventListener('click', async (event) => {
                searchInput.value = '';
                const suggestion = event.target.textContent;
                searchInput.value = suggestion;
                searchForm.dispatchEvent(new Event('submit'));
            });
            if (suggestions.length === 0) {
                suggestionsContainer.classList.add('dnone');
                searchInput.style.borderRadius = '0.75rem';
            }
        }
    } catch (error) {
        console.log(error);
    }
});
