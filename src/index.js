  const url = "http://localhost:3000/films"
  const movieCard = document.querySelector('.card')
  // console.log(movieCard)

  // Fetch Starts Here
  const getAllMovies = () =>{
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(json => {
      json.forEach(movie => RenderMovies(movie) )
    })
  }
  getAllMovies()

  const fetchOneMovie = () => {
    fetch(`http://localhost:3000/films/1`)
    .then(res => res.json())
    .then(json => { 
      buildMovie(json)
  
    })
  }
  fetchOneMovie()


  const buildMovie = (detail) => {

    const moviePoster = document.querySelector('img')
    moviePoster.src = detail.poster
    console.log(moviePoster)
  movieCard.id = detail.id
  movieCard.innerHTML = `
  <div id="title" class="title">${detail.title}</div>
  <div id="runtime" class="meta">${detail.runtime} minutes</div>
  <div class="content">
      <div class="description">
          <div id="film-info">${detail.description}</div>
          <span id="showtime" class="ui label">${detail.showtime}</span>
          <span id="ticket-num">${detail.tickets_sold}</span> remaining tickets
      </div>
  </div>
  <div class="extra content">
    <div class="ui orange button">Buy Ticket</div>
  </div>
  </div>

  `
  listenForTicketBuy(detail)
  }
  buildMovie()


  function listenForTicketBuy (detail){
    let ticketBtn = movieCard.querySelector('.ui.orange')
    ticketBtn.addEventListener('click', () => {
      if(detail.tickets_sold > 0){
        buyTicket(detail)
        alert(`Enjoy watching ${detail.title}`)
      }
      alert(`We are sorry! ${detail.title} is sold out`)
      //we want our event listener to only click when the tickets aren't soldout
      //it will default to false and stop clicks once statement is false OR = 0
    
    })
  }
  
    // whenever a click happens the tickets should decrease
  function buyTicket (detail){
    data = {
      tickets_sold: detail.tickets_sold -= 1
    }
    fetch(`http://localhost:3000/films/${detail.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      const span = document.getElementById('ticket-num')
      span.textContent = `${json.tickets_sold}`
      console.log(span)
    })
  }



