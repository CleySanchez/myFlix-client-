// src/components/MainView/MainView.jsx
import React, { useState, useEffect } from 'react';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';
import { MovieView } from '../MovieView/MovieView';
import { MovieCard } from '../MovieCard/MovieCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MainView.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://my-movie-flix-777-b5447997dd22.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            imagePath: movie.ImagePath,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={handleBackClick} />
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div>The list is empty!</div>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {movies.map((movie) => (
        <Col md={4} key={movie.id}>
          <MovieCard movie={movie} onMovieClick={handleMovieClick} />
        </Col>
      ))}
      <Col xs={12} className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </Col>
    </Row>
  );
};
