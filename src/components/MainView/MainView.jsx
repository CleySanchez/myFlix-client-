// src/components/MainView/MainView.jsx
import React, { useState, useEffect } from 'react';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';
import { MovieView } from '../MovieView/MovieView';
import { MovieCard } from '../MovieCard/MovieCard';
import { ProfileView } from '../ProfileView/ProfileView'; // Import the ProfileView component
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  NavigationBar  from '../Navigation-Bar/Navigation-Bar.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MainView.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

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

  const handleUpdateUser = (updatedUser) => {
    // Implement user update logic here
    console.log('Updating user:', updatedUser);
  };

  const handleDeregisterUser = () => {
    // Implement user deregistration logic here
    console.log('Deregistering user');
  };

  const handleAddFavorite = (movieId) => {
    // Implement add favorite logic here
    console.log('Adding favorite:', movieId);
  };

  const handleRemoveFavorite = (movieId) => {
    // Implement remove favorite logic here
    console.log('Removing favorite:', movieId);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }} />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  movies={movies}
                  onUserUpdate={handleUpdateUser}
                  onUserDeregister={handleDeregisterUser}
                  addFavorite={handleAddFavorite}
                  removeFavorite={handleRemoveFavorite}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

