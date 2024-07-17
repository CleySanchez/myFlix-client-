import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieCard.scss';

export const MovieCard = ({ movie, addFavorite, removeFavorite, isFavorite }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-link">
      <Card className="movie-card">
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          {isFavorite ? (
            <Button variant="danger" onClick={(e) => { e.preventDefault(); removeFavorite(movie.id); }}>
              Remove from Favorites
            </Button>
          ) : (
            <Button variant="primary" onClick={(e) => { e.preventDefault(); addFavorite(movie.id); }}>
              Add to Favorites
            </Button>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
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
