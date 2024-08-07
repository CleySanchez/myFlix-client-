import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieView.scss';

export const MovieView = ({ movies, addFavorite, removeFavorite, favorites }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const isFavorite = favorites.includes(movieId);

  useEffect(() => {
    const currentMovie = movies.find((m) => m.id === movieId);
    setMovie(currentMovie);
  }, [movieId, movies]);

  return (
    <Card className="movie-view">
      <Link to="/">
        <Button variant="primary" className="back-button">Back</Button>
      </Link>
      {movie && (
        <>
          <Card.Img variant="top" src={movie.imagePath} className="movie-image"/>
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
        </>
      )}
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  })).isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};
