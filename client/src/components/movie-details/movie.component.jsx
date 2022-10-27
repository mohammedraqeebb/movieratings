import React from 'react';
import './movie.styles.scss';
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie }) => {
  const { name, yearOfRelease, plot, poster } = movie;
  const navigate = useNavigate();
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="movie-container"
    >
      <div className="movie-image">
        <img src={poster} alt="image details" />
      </div>

      <div className="movie-details">
        <h3>Name:{name}</h3>
        <div>
          <h3>Year of release {yearOfRelease}</h3>
          <h3>Plot {plot}</h3>
        </div>
      </div>
    </div>
  );
};

export default Movie;
