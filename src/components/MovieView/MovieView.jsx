// src/components/movie-view/movie-view.jsx
import React from "react";
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
