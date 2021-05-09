const movieSearchInputEl = document.querySelector("#search-input");
const movieSearchFormEl = document.querySelector("#movie-search-form")

const movieSearch = function(event) {
    event.preventDefault();

    let movieName = movieSearchInputEl.value.trim();

    if (movieName) {
        const apiUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=c09abee9`;

        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayResults(data);
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

function displayResults(movieResults) {
    console.log(movieResults);

    
}



movieSearchFormEl.addEventListener("submit", movieSearch);