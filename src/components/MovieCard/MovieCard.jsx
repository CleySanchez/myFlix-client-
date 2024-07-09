// src/components/MovieCard/MovieCard.jsx
import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./MovieCard.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="movie-card" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.image} alt={`${movie.title} poster`} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Button variant="primary" onClick={() => onMovieClick(movie)}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
