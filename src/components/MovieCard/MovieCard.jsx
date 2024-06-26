// src/components/movie-card/movie-card.jsx
import React from "react";
import "./MovieCard.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <img src={movie.image} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
    </div>
  );
};