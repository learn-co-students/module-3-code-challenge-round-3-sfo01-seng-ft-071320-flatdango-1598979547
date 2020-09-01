const url = "http://localhost:3000/films"

document.addEventListener('DOMContentLoaded', function () {
    fetchFirstFilm()
    addFirstFilm()
    buyTicket()
    fetchFilmToBuyTicket ()
});

function fetchFirstFilm () {
    fetch('http://localhost:3000/films/1')
    .then(response => response.json())
    .then(data => addFirstFilm(data));
}

function fetchFilmToBuyTicket () {

    fetch('http://localhost:3000/films/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            tickets_sold
        )
}).then(response => response.json())
.then(data => buyTicket(data));

}


function addFirstFilm (film) {
    let posterContainer = document.getElementById('poster')
    posterContainer.src = film.poster
    let movieTitle = document.getElementById('title')
    movieTitle.innerHTML = film.title
    let movieRunTime = document.getElementById('runtime')
    movieRunTime.innerHTML = film.runtime
    let movieShowTime = document.getElementById('showtime')
    movieShowTime.innerHTML = film.showtime
    let availableTickets = document.getElementById('ticket-num')
    availableTickets.innerHTML = film.capacity - film.tickets_sold
}

function buyTicket(ticket) {

    let ticketButton = document.getElementsByClassName('ui orange button')
    // let availableTickets = document.getElementById('ticket-num')
    ticketButton.addEventListener('click', function() {
        ticket.tickets_sold++
        // availableTickets.innerHTML = film.capacity - film.tickets_sold - 1
    })
}

addFirstFilm
buyTicket