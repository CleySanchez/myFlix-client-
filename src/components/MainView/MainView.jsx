/* // components/MainView.js
import React, { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import "./MainView.scss";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
      image: "https://path/to/inception.jpg",
      genre: "Sci-Fi",
      director: "Christopher Nolan"
    },
    {
      id: 2,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival...",
      image: "https://path/to/interstellar.jpg",
      genre: "Sci-Fi",
      director: "Christopher Nolan"
    },
    {
      id: 3,
      title: "The Dark Knight",
      description: "When the menace known as the Joker emerges from his mysterious past...",
      image: "https://path/to/dark-knight.jpg",
      genre: "Action",
      director: "Christopher Nolan"
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
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieClick={handleMovieClick} />
      ))}
    </div>
  );
};

export { MainView }; */

// src/components/MainView/MainView.jsx
import React, { useEffect, useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import "./MainView.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://my-movie-flix-777-b5447997dd22.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            image: movie.ImagePath,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={handleBackClick} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={handleMovieClick}
        />
      ))}
    </div>
  );
};
