/** Imports *******/
import { getPlaceHolderIndexHTML, hideImagePlacerHolder, displayNotification } from '/assets/js/utils.js'

/** Variable declarations *******/
const searchForm = document.getElementById('search-form')
const searchField = document.getElementById('search-field')
const filmList = document.getElementById('film-list')

/** API config *******/
const apiKey = '555b6bee'
let searchQuery = ''

/** Form event listener *******/
searchForm.addEventListener("submit", function(e) {
    e.preventDefault()
    searchQuery = searchField.value

    // Sets the API url
    const apiUrl = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`
    fetchFilms(apiUrl)
})

/** Renders the film using the search query as filter *******/
/** >> Async function: Mandatory if it is used as sync *******/
async function fetchFilms(apiUrl) {
    // Fetch data while the passed URL works or the API is functional
    try {
        // Fetch and response declaration
        const response = await fetch(apiUrl)
        const data = await response.json()

        // Results are being displayed as long as they match with the search query 
        if (data.Search) {
            let listHtml = ''

            for (const film of data.Search) {
                const filmData = await fetchFilmDetails(film.imdbID)

                // If the film has no image, then it uses a placerholder image
                if (filmData.Poster === 'N/A') {
                    filmData.Poster = '/assets/images/placeholder-poster.png'
                }

                listHtml += `
                <div class="film-item">
                    <img class="film-poster" src="${filmData.Poster}" alt="Poster image of ${filmData.Title}">
                    <div class="film-content">
                        <div class="film-header">
                            <div class="film-title">${filmData.Title}</div>
                            <div class="film-rating"><i class="fa-solid fa-star"></i> ${filmData.imdbRating}</div>
                        </div>
                        <div class="film-meta">
                            <span>${filmData.Runtime}</span>
                            <span>${filmData.Genre}</span>
                            <button data-id="${film.imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                        </div>
                        <div class="film-description">
                            ${filmData.Plot}
                        </div>
                    </div>
                </div>
                `

                filmList.innerHTML = listHtml

                // Uses dataset to trigger only the clicked film
                document.addEventListener('click', function(e) {
                    if (e.target.dataset.id) {
                        if (film.imdbID === e.target.dataset.id) {
                            addToWatchlist(filmData)
                        }
                    }
                })
            }
        } else {
            filmList.innerHTML = getPlaceHolderIndexHTML("Unable to find what you are looking for.<br>Please try another search.")
            hideImagePlacerHolder()
        }
    } catch (error) {
        filmList.innerHTML = getPlaceHolderIndexHTML("Ups! Something went wrong!<br>Please, notify the administrator.")
        hideImagePlacerHolder()
    }
}

/** Fetches the film details in a separate fetch due to the fact that they don't live in the same array. *******/
async function fetchFilmDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
    const data = await response.json()
    return data
}

/** Adds the clicked film to the localstorage array only if it does not exist *******/
function addToWatchlist(filmData) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

    const existingFilm = watchlist.find(item => item.imdbID === filmData.imdbID)

    if (!existingFilm) {
        watchlist.push(filmData)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        displayNotification("Film added to Watchlist!")
    } else {
        displayNotification("Film is already in your Watchlist!")
    }
}

/** Sets the initial placeholder text *******/
filmList.innerHTML = getPlaceHolderIndexHTML("Start exploring")