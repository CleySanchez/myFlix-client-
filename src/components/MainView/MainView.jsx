import React, { useState, useEffect } from 'react';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';
import { MovieView } from '../MovieView/MovieView';
import { MovieCard } from '../MovieCard/MovieCard';
import { ProfileView } from '../ProfileView/ProfileView';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavigationBar from '../Navigation-Bar/Navigation-Bar.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MainView.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(user ? user.FavoriteMovies : []);
  const [searchTerm, setSearchTerm] = useState('');
  const [similarMovies, setSimilarMovies] = useState([]);
  const location = useLocation(); // Hook to get the current route

  useEffect(() => {
    if (!token) return;

    fetch('https://my-movie-flix-777-b5447997dd22.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          imagePath: movie.ImagePath,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
        }));
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
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleDeregisterUser = () => {
    console.log('Deregistering user');
  };

  const handleAddFavorite = (movieId) => {
    const updatedFavorites = [...favorites, movieId];
    setFavorites(updatedFavorites);
    setUser({ ...user, FavoriteMovies: updatedFavorites });
    localStorage.setItem('user', JSON.stringify({ ...user, FavoriteMovies: updatedFavorites }));

    fetch(`https://my-movie-flix-777-b5447997dd22.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(id => id !== movieId);
    setFavorites(updatedFavorites);
    setUser({ ...user, FavoriteMovies: updatedFavorites });
    localStorage.setItem('user', JSON.stringify({ ...user, FavoriteMovies: updatedFavorites }));

    fetch(`https://my-movie-flix-777-b5447997dd22.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const fetchSimilarMovies = (movieId) => {
    fetch(`https://my-movie-flix-777-b5447997dd22.herokuapp.com/movies/${movieId}/similar`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const similarMoviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          imagePath: movie.ImagePath,
          genre: movie.Genre.Name,
          director: movie.Director.Name,
        }));
        setSimilarMovies(similarMoviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching similar movies:', error);
      });
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-view">
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        {location.pathname !== '/profile' && (
          <input
            type="text"
            className="search-input"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
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
                    setFavorites(user.FavoriteMovies);
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
                  <MovieView 
                    movies={movies}
                    addFavorite={handleAddFavorite}
                    removeFavorite={handleRemoveFavorite}
                    favorites={favorites}
                  />
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
                  favorites={favorites}
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
              ) : filteredMovies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {filteredMovies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard
                        movie={movie}
                        addFavorite={handleAddFavorite}
                        removeFavorite={handleRemoveFavorite}
                        isFavorite={favorites.includes(movie.id)}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </div>
  );
};