/** Imports *******/
import { getPlaceHolderWatchlistHTML, displayNotification } from '/assets/js/utils.js'

/** Variable declarations *******/
const filmList = document.getElementById('film-list')

/** Watchlist array for localstorage *******/
let filmWatchlistArray = JSON.parse(localStorage.getItem('watchlist'))

/** Gets the HTML from the localstorage watchlist films *******/
function getFilmsFromLocalStorageHTML() {
    return filmWatchlistArray.map(filmData => `
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
                    <button data-delete="${filmData.imdbID}"><i class="fa-solid fa-circle-minus"></i> Remove</button>
                </div>
                <div class="film-description">
                    ${filmData.Plot}
                </div>
            </div>
        </div>
    `).join('')
}

/** Deletes a film from the watchlist in the localstorage *******/
function deleteFilmFromWatchlist(imdbID) {
    const index = filmWatchlistArray.findIndex(filmData => filmData.imdbID === imdbID)
    if (index !== -1) { // Removes items while they exist
        filmWatchlistArray.splice(index, 1)
        localStorage.setItem('watchlist', JSON.stringify(filmWatchlistArray))
        displayNotification('Film removed!')
    }
}

/** Renders the watchlist *******/
function renderWatchList() {
    // Checks if watchlist has element or not
    const html = filmWatchlistArray.length > 0
        ? getFilmsFromLocalStorageHTML()
        : getPlaceHolderWatchlistHTML("Your watchlist is looking a little empty...")

    filmList.innerHTML = html
}
/** Remove event listener *******/
document.addEventListener('click', function (e) {
    if (e.target.dataset.delete) {
        deleteFilmFromWatchlist(e.target.dataset.delete)
        renderWatchList()
    }
})

/** On page load *******/
renderWatchList()