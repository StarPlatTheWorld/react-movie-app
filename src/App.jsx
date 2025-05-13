import React, { useState, useEffect } from 'react'
import Search from './components/search'

//Sets the base URL of the TMBD API we are calling from for our application.//
const API_BASE_URL = ' https://api.themoviedb.org/3'

//Sets our API KEY by importing the API key from our external environment file.//
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//API OPTIONS such as the HTTP Method used, the headers we'll need like accepting json and the authorization verifies who is making the request via an API KEY.//
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  //Creating a search state within main app to be passed as a prop to the Search component.//
  //States should never be mutated, i.e. searchTerm = 'NEW SEARCH TERM'. State is only mutated by setter function.//
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMovies = async () => {
    try {

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
    }
  }

  useEffect(() => {

  }, [])
  

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>   
        
          <img src="./hero.png" alt='Hero Banner' />
          <h1>Find The <span className='text-gradient'>Movies</span> You'll Enjoy Hassle Free</h1>
       
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/*Two different props, as user searches for a movie it gets passed into the Search component*/}
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App