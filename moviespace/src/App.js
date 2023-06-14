import './App.css';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=45e86c82';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleAutocomplete = async (title) => {
    setSearchTerm(title);
    setSearchSuggestions([]);
    await searchMovies(title);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      searchAutocomplete(value);
    } else {
      setSearchSuggestions([]);
    }
  };

  const searchAutocomplete = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Response === 'True') {
      setSearchSuggestions(data.Search.map((movie) => movie.Title));
    } else {
      setSearchSuggestions([]);
    }
  };

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  return (
    <div className='app'>
      <h1>MovieSpace</h1>
      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <img src={logo} alt='search' onClick={handleSearch} />
      </div>

      {searchSuggestions.length > 0 && (
        <ul className='suggestions'>
          {searchSuggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleAutocomplete(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
