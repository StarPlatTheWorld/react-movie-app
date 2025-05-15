import React, { useState, useEffect } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";

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
  //Creating a loading state for when the data from the API is loading into the web application.//
  const [isLoading, setIsLoading] = useState(false);
  //Creates an async arrow function that handles data fetching and error handling.//
  const fetchMovies = async () => {
    //Sets the isLoading state value to true initially and leaves the errorMessage state empty//
    setIsLoading(true);
    setErrorMessage("");

    //Sets up a try, catch, finally function to handle API endpoints, data responses, error handling, and loading functionality.//
    try {
      //Sets the endpoint to the base API URL and then adds additional data to grab movies, sorting them popularity in descending order.//
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
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

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
