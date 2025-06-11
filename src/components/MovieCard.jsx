import React from "react";

// Creates the MovieCard constant, with properties being deconstructed in the arrow function.
const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  // Return a div with className movie-card, which includes an image and alt text, utilising props from the main component.
  return (
    <div className='movie-card'>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      {/* Returns the movie title */}
      <div>
        <h3>{title}</h3>
        {/* Returns several divs, utilising different deconstructed props to showcase ratings, languages, and release dates */}
        <div className='content'>
          <div className='rating'>
            <img src='star.svg' alt='Star Icon' />
            {/* Checks if vote_average exists  using ? operator, if it does it renders the rating average down to the first fraction digit, if not then render N/A */}
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>

            <span>•</span>
            {/* Renders the original movie language. */}
            <p className='lang'>{original_language}</p>

            <span>•</span>
            {/* Checks if release_date exists, if it does then split from the hyphen and grab the first portion of the string which in this case is the year, if it doesn't exist then render N/A */}
            <p className='year'>
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
