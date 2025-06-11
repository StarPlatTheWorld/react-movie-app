import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

//Sets the base URL of the TMBD API we are calling from for our application.//
const API_BASE_URL = " https://api.themoviedb.org/3";

//Sets our API KEY by importing the API key from our external environment file.//
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//API OPTIONS such as the HTTP Method used, the headers we'll need like accepting json and the authorization verifies who is making the request via an API KEY.//
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  //States should never be mutated, i.e. searchTerm = 'NEW SEARCH TERM'. State is only mutated by setter function.//

  //Creating a search state within main app to be passed as a prop to the Search component.//
  const [searchTerm, setSearchTerm] = useState("");
  //Creating an error message state within the main app to produce error messages when needed.//
  const [errorMessage, setErrorMessage] = useState("");
  //Creating a movie list state for pulling movies from the TMDB API. Ensure data is being parsed as an array if using map function.//
  const [movieList, setMovieList] = useState([]);
  //Creating a trending movies state for displaying top 5 trending movies within the Appwrite database collection.//
  const [trendingMovies, setTrendingMovies] = useState([]);
  //Creating a loading state for when the data from the API is loading into the web application.//
  const [isLoading, setIsLoading] = useState(false);
  //Creating a debounce state for the searchTerm to help with rapid API requests.//
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  //Debounce arrow function for the searchTerm. Delaying input searches by half a second.//
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  //Creates an async arrow function that handles data fetching and error handling.//
  const fetchMovies = async (query = "") => {
    //Sets the isLoading state value to true initially and leaves the errorMessage state empty//
    setIsLoading(true);
    setErrorMessage("");

    //Sets up a try, catch, finally function to handle API endpoints, data responses, error handling, and loading functionality.//
    try {
      //Sets the endpoint to the base API URL and then adds additional data to grab movies, sorting them popularity in descending order.//
      //Also checks if a query does exist, allowing for either a search query or discover query to be displayed.//
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` //encodeURI allows searchTerm to be processed correctly regardless of special characters.//
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      //Creates the response constant, awaiting data to be fetched from the declared endpoint and applying the API_OPTIONS values.//
      const response = await fetch(endpoint, API_OPTIONS);
      //If statement to run if the response is NOT okay (using the ! operator), throwing a new error.//
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      //Creates a data constant that awaits the response as json format.//
      const data = await response.json();

      //If the response is strictly false, then send our errorMessage state and set the movieList state to an empty array.//
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      //Sets the movieList state to data.results OR an empty array if the IF statement above clears.//
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      //When catching an error, flag the console with an error message.//
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      //Once all of the above statements clear and are passed then set the isLoading state to false.//
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  //useEffect Hook to synchronize our component with the external TMBD API.//
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>
            Find The <span className='text-gradient'>Movies</span> You'll Enjoy
            Hassle Free
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/*Two different props, as user searches for a movie it gets passed into the Search component*/}
        </header>
        {/* If trendingMovies exists and there is a section, then render the following JSX elements and functions. */}
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section for all movies */}
        <section className='all-movies'>
          <h2>All Movies</h2>
          {/* If isLoading, render spinnder component. */}
          {isLoading ? (
            <Spinner />
          ) : // If errorMessage, render errorMessage in P tag.
          errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            // Underordered list of movie array using Map()
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
