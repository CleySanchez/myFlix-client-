import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MovieCard } from '../MovieCard/MovieCard';
import './ProfileView.scss';

export const ProfileView = ({ user, movies, onUserUpdate, onUserDeregister, addFavorite, removeFavorite, favorites }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setFavoriteMovies(movies.filter(movie => favorites.includes(movie.id)));
  }, [favorites, movies]);

  const handleUpdate = () => {
    onUserUpdate({ Username: username, Password: password, Email: email, Birthday: birthday, FavoriteMovies: favorites });
  };

  const handleDeregister = () => {
    onUserDeregister();
  };

  return (
    <Row className="profile-view">
      <Col md={6} className="profile-section">
        <h2>User Profile</h2>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <div className="button-group">
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="danger" onClick={handleDeregister}>
              Deregister
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={6} className="favorite-movies-section">
        <h2>Favorite Movies</h2>
        <Row>
          {favoriteMovies.map((movie) => (
            <Col key={movie.id} md={6} lg={4} className="mb-4">
              <MovieCard
                movie={movie}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                isFavorite={favorites.includes(movie.id)}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onUserDeregister: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
};
