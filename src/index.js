const url = "http://localhost:3000/films"
// grab elements 
let poster = document.getElementById('poster')
let description = document.getElementById('film-info')
let title = document.getElementById('title')
let runtime = document.getElementById('runtime')
let showtime = document.getElementById('showtime')
let availTickets = document.getElementById('ticket-num')

    
const fetchMovies = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let first = data[0];
        showMovie(first);
    })
        // {data(movie => showMovie(movie)));
}

fetchMovies() 

const showMovie = (movie) => {
    // // update elements 
    poster.src = `${movie.poster}`
    description.innerText = `${movie.description}`
    title.innerText = `${movie.title}`
    runtime.innerText = `${movie.runtime} minutes`
    showtime.innerText = `${movie.showtime}` 
    availTickets.innerText = `${movie.capacity - movie.tickets_sold }` 
    // event listener for buy button 
    const buyButton = document.getElementById('buybutton')
    buyButton.addEventListener('click', (e) => buyTicket(e, movie)) 
    
}

// buy ticket and update frontend 
const buyTicket = (e, movie) => {
    if(availTickets.innerText >= 1) {
        availTickets.innerText -= 1

        buyTicketBackend(e, movie) 
    } 
    else {
        availTickets.innerText = 'No'
    }
}

const buyTicketBackend = (e, movie) => { 

    let data = {
        tickets_sold: movie.tickets_sold ++ 
    }

    fetch('http://localhost:3000/films/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => console.log(json))
}


// capacity: "30"
// description: "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature."
// id: "1"
// poster: "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
// runtime: "108"
// showtime: "04:00PM"
// tickets_sold: 27
// title: "The Giant Gila Monster"


// The endpoints you will need are:

// - GET `/films/[:id]` (start with `/films/1`)
// - PATCH `/films/[:id]`
// - GET `/films` (for Advanced Deliverables only)

// ## Core Deliverables

// As a user, I can:

// - Buy a ticket for a movie. The number of tickets sold for that movie should be persisted, and I should be able to see the number of available tickets decreasing on the frontend.
// - I should not be able to buy a ticket if the showing is sold out.