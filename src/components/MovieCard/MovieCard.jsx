// src/components/movie-card/movie-card.jsx
import React from 'react';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
