// components/MainView.js
import React, { useState } from 'react';
import MovieCard from '../MovieCard';
import MovieView from '../MovieView';

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Inception',
      description: 'A thief who steals corporate secrets through use of dream-sharing technology...',
      image: 'path/to/inception.jpg',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan'
    },
    {
      id: 2,
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival...',
      image: 'path/to/interstellar.jpg',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker emerges from his mysterious past...',
      image: 'path/to/dark-knight.jpg',
      genre: 'Action',
      director: 'Christopher Nolan'
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={handleBackClick} />;
  }

  return (
    <div className="main-view">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
      ))}
    </div>
  );
};

export default MainView;