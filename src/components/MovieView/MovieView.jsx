// src/components/movie-view/movie-view.jsx
import React from 'react';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export default MovieView;
