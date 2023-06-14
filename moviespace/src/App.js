import './App.css';
import { useCallback, useEffect } from 'react';
import logo from './logo.svg'

//45e86c82

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=45e86c82';
const movie1 = {
  "Title": "Guardians of the Galaxy Vol. 2",
  "Year": "2017",
  "imdbID": "tt3896198",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
}

const App = () => {
  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&S=${title}`);
      const data = await response.json();

      console.log(data.Search);
      }
  useEffect(()=>{
    searchMovies('Guardians of the Galaxy Vol. 2')
  },[] )

  return (
    <div className='app'>
      <h1>MovieSpace</h1>
      <div className='search'>
        <input
          placeholder='Srearch for movies'
          value="Superman"
          onChange={()=> {}}
        />
        <img 
          src={logo}
          alt='search'
          onClick={()=> {}}
        />
      </div>
      <div className="container">
        <div className="movie">
          <div>
            <p>{movie1.Year}</p>
          </div>
          <div>
              <img src={movie1.Poster !== 'N/A' ? movie1.Poster : "https://via.placeholder.com/400"} alt={movie1.Title}  />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
