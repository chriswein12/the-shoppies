const movieSearchInputEl = document.querySelector("#search-input");
const movieSearchFormEl = document.querySelector("#movie-search-form");
const movieSearchResultsEl = document.querySelector("#search-results");

const nominations = [];

const movieSearch = function(event) {
    event.preventDefault();

    let movieName = movieSearchInputEl.value.trim();

    if (movieName) {
        const apiUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=c09abee9`;

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
    console.log(movieResults);
    movieSearchResultsEl.textContent = "";

    if (movieResults.Response === "False") {
        movieSearchResultsEl.textContent = "No movies found.";
        return;
    } 

    // const resultsListEl = document.createElement("ul");

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
    const targetEl = event.target;
    const targetText = targetEl.previousSibling.textContent;

    targetEl.setAttribute("disabled", "");

    nominations.push(targetText);
        
}





movieSearchFormEl.addEventListener("submit", movieSearch);