/** Variable declaration *******/
const notificationModal = document.getElementById('notification-modal')

// Gets the placeholder HTML for the index page
export function getPlaceHolderIndexHTML(placeholderText) {
    return `
        <div id="film-list-placeholder">
            <div id="film-list-placeholder-inner">
                <img src="/assets/images/film-icon.png" alt="Film icon">
                <p id="placeholder-text">${placeholderText}</p>
            </div>
        </div>
    `
}

// Gets the placeholder HTML for the watchlist page
export function getPlaceHolderWatchlistHTML(placeholderText) {
    return `
        <div id="film-list-placeholder">
            <div id="film-list-placeholder-inner">
                <p id="placeholder-text">${placeholderText}</p>
                <a id="add-some-movies" href="index.html"><i class="fa-solid fa-circle-plus"></i> Let’s add some movies!</a>
            </div>
        </div>
    `
}

/** Hides the placerholder image icon *******/
export function hideImagePlacerHolder() {
    document.querySelector("#film-list-placeholder-inner img").style.display = "none"
}

// Displays a notification with a custom message
export function displayNotification(message) {
    document.getElementById('modal-content').innerHTML = `<p>${message}</p>`
    notificationModal.style.display = 'block'

    setTimeout(function() {
        notificationModal.style.display = 'none'
    }, 2100)
}