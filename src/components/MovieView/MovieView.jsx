// src/components/MovieView/MovieView.jsx
import React from "react";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./MovieView.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="movie-view">
      <Button variant="primary" onClick={onBackClick}>Back</Button>
      <Card.Img variant="top" src={movie.image} alt={`${movie.title} poster`} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
      </Card.Body>
    </Card>
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
