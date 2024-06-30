// src/components/MovieView/MovieView.jsx

import React from "react";
import PropTypes from "prop-types";
import "./MovieView.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <button onClick={onBackClick}>Back</button>
      <h2>{movie.title}</h2>
      <img src={movie.image} alt={`${movie.title} poster`} />
      <p>{movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

