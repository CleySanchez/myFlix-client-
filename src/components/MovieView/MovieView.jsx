// src/components/MovieView/MovieView.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieView.scss';

export const MovieView = ({ movie, addFavorite, removeFavorite, isFavorite }) => {
  return (
    <Card className="movie-view">
      <Link to="/">
        <Button variant="primary">Back</Button>
      </Link>
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
        {isFavorite ? (
          <Button variant="danger" onClick={() => removeFavorite(movie.id)}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={() => addFavorite(movie.id)}>
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
