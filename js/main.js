const searchInput = document.getElementById('search');
const match = document.getElementById('match-list');

//Search 
const searchStates = async searchText => {
    const response = await fetch('../data/states.json');
    const states = await response.json();
    //Live Match
    let matches = states.filter(state => {
        const matchReg = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(matchReg) || state.code.match(matchReg);
    })
    if (searchText.length == 0) {
        matches = [];
        match.innerHTML = '';
    }

    outputHTML(matches);
};

//Show Results
const outputHTML = matches => {
    const ctr = districts => {
        return districts.map(district => `
                <li class="list-group-item bg-dark">
                    ${district.name}
                </li>`).join('');
    }
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card bg-primary mb-4">
            <div class="card-body text-warning">
                <h1>
                    <div class="card-title text-info text-center "> ${match.name} </div>
                <h1>
                <h2 class="card-subtitle m-2">Capital: ${match.capital} || Code: ${match.code} || Type: ${match.type}</h4>
                 <p class="card-text text-center">Districts: ${match.districts.length}<ul class="list-group list-group-flush">${ctr(match.districts)}</ul>
                </p>
            </div>
        </div>
        `).join('');
        match.innerHTML = html;
    }

}

search.addEventListener('input', () => searchStates(searchInput.value));