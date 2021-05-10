const movieSearchInputEl = document.querySelector("#search-input");
const movieSearchFormEl = document.querySelector("#movie-search-form");
const movieSearchResultsEl = document.querySelector("#search-results");
const nominationsListEl = document.querySelector("#nomination-list");

const nominations = [];

const movieSearch = function(event) {
    event.preventDefault();

    let movieName = movieSearchInputEl.value.trim();

    // fetch request and error handling from the OMDB database.
    if (movieName) {
        const apiUrl = `https://www.omdbapi.com/?s=${movieName}&apikey=c09abee9`;

        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displaySearchResults(data);
                });
            } else {
                alert("No search results available.");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to movie database at this time")
        });
    } else {
        alert("Please enter a movie name");
    }
}

function displaySearchResults(movieResults) {

    movieSearchResultsEl.textContent = "";

    if (movieResults.Response === "False") {
        movieSearchResultsEl.textContent = "No movies found.";
        return;
    } 

    // displays the results of the search.
    for (let i = 0; i < movieResults.Search.length; i++) {
        const movieName = movieResults.Search[i].Title;
        const movieYear = movieResults.Search[i].Year;
        const movieInfo = movieName + " (" + movieYear + ")";
        
        const singleResultEl = document.createElement("li");
        const singleResultTextEl = document.createElement("p");
        const nominateBtnEl = document.createElement("button")


        singleResultTextEl.textContent = movieInfo;
        nominateBtnEl.classList = "btn nominate-btn btn-secondary";
        nominateBtnEl.textContent = "Nominate";
        nominateBtnEl.addEventListener("click", addNomination);

        singleResultTextEl.append(nominateBtnEl);
        singleResultEl.appendChild(singleResultTextEl);
        movieSearchResultsEl.appendChild(singleResultEl);

        // each time the search results load, a check is done to see if a result has already been nominated.
        for (let i = 0; i < nominations.length; i++) {
            if (movieInfo === nominations[i]) {
                nominateBtnEl.setAttribute("disabled", "")
            } else {
                console.log(nominations[i])
            }
        }
    }

}

const addNomination = function (event) {

    if (nominations.length >= 5) {
        alert("You have already nominated 5 movies");
        return;
    }

    const targetEl = event.target;
    const targetText = targetEl.previousSibling.textContent;

    // disable button after click.
    targetEl.setAttribute("disabled", "");

    nominations.push(targetText);

    displayNominations();        
}


function displayNominations() {

    nominationsListEl.textContent = "";

    for (let i = 0; i < nominations.length; i++) {
        
        const singleNomineeEl = document.createElement("li");
        const singleNomineeTextEl = document.createElement("p");
        const removeNomineeBtnEl = document.createElement("button");

        singleNomineeTextEl.textContent = nominations[i];
        removeNomineeBtnEl.classList = "btn nominate-btn btn-secondary";
        removeNomineeBtnEl.textContent = "Remove";
        removeNomineeBtnEl.setAttribute("id", "nomineeId-" + i);
        removeNomineeBtnEl.addEventListener("click", removeNomination);

        singleNomineeTextEl.append(removeNomineeBtnEl);
        singleNomineeEl.appendChild(singleNomineeTextEl);
        nominationsListEl.appendChild(singleNomineeEl);
    }
}

const removeNomination = function (event) {

    const targetElId = event.target.getAttribute("id").split("-");
    const id = targetElId[1];

    // Removes the "disabled" attribute from the button in the search list if the movie is still showing in the results
    const disabledButtons = movieSearchResultsEl.querySelectorAll("button[disabled]");
    
    for (let i = 0; i < disabledButtons.length; i++) {
        const text = disabledButtons[i].previousSibling.textContent;
        
        if (text === nominations[id]) {
            disabledButtons[i].removeAttribute("disabled");
        }
    }

    nominations.splice(id, 1);

    displayNominations();
}


movieSearchFormEl.addEventListener("submit", movieSearch);