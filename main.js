
const btn = document.querySelector('.btn-primary');
const search = document.querySelector('.search');
const single =document.querySelector('.singleMovie');
var movie = document.querySelector('.movie');

btn.addEventListener('click', function() {
    console.log('search: ', search.value);
    
      axios.get('http://www.omdbapi.com/?s=' + search.value + '&apikey=55126040')
      .then((response) => {
        console.log("response.data.Search: ", response.data.Search);

        const outerDiv = document.querySelector('.col-md-3');
        const movies = response.data.Search;
        console.log("movies: ". movies);
        
        let output ='';

        movies.forEach((movie) => {
        // debugging
        console.log("single movie: ", movie);


        output += `
          <div class="div">
            <div class="well">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="button" href="#">Movie Details</a>
            </div>
          </div>
        `;

    })
      outerDiv.innerHTML = output;
  })

    search.value='';
})




function movieSelected(id){
  sessionStorage.setItem('movieId', id)
  window.location = 'details.html';
  return false
}




function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com/?i=' + movieId+ '&apikey=55126040')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output ='';
    

     output +=
      `
      <div class="singleMovie">
      <img src="${movie.Poster}" class="image"/>
      <div class="details">
      <h2>${movie.Title}:</h2>
      <ul class="">
      <li class="list"><strong>Genre:</strong>${movie.Genre}</li>
      <li class="list"><strong>Released:</strong>${movie.Released}</li>
      <li class="list"><strong>Rated:</strong>${movie.Rated}</li>
      <li class="list"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
      <li class="list"><strong>Director:</strong>${movie.Director}</li>
      <li class="list"><strong>Writer:</strong>${movie.Writer}</li>
      <li class="list"><strong>Award:</strong>${movie.Awards}</li>
      <li class="list"><strong>Actors:</strong>${movie.Actors}</li>
      </ul>
      <h3>Plot:</h3>
      <p class="story"> ${movie.Plot}</p>
      <a class="IMDB-button" href="http://www.imdb.com/title/${movie.imdbID}" target="blank">View IMDB</a>
      <a class="Go-button" href="index.html">Go Back To Search</a>

      </div>
      </div>
      `;

    single.innerHTML= output;
})
}

