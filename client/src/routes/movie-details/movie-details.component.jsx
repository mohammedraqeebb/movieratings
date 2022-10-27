import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/use-request';
import './movie-details.styles.scss';
import { useSelector } from 'react-redux';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const user = useSelector((state) => state.user);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { doRequest: getMovieDetailsRequest, errors: getMovieDetailsError } =
    useRequest({
      url: `http://localhost:5000/api/movie/${movieId}`,
      method: 'get',
      body: '',
      onSuccess: (data) => setMovieDetails(data.movie),
    });
  const { doRequest: deleteMovieRequest, errors: deleteMovieErrors } =
    useRequest({
      url: `http://localhost:5000/api/movie/${movieId}`,
      method: 'post',
      body: '',
      onSuccess: (data) => navigate('/'),
    });
  const isOwner =
    user.isSignedIn &&
    JSON.stringify(movieDetails) !== '{}' &&
    user.id === movieDetails.user;

  useEffect(() => {
    getMovieDetailsRequest();
  }, []);
  const { name, actors, producer, poster, plot, yearOfRelease } = movieDetails;
  return (
    <div className="movie-details-wrapper">
      {isOwner && (
        <div>
          <button onClick={() => navigate(`/movie/edit/${movieDetails.id}`)}>
            edit
          </button>
          <button onClick={() => deleteMovieRequest()}>delete</button>
        </div>
      )}
      <div className="movie-details-container">
        <div className="image">
          <img src={poster} alt={name} />
        </div>
        <div className="movie-details">
          <h3>name: {name}</h3>
          <h4>{plot}</h4>
          <h4>year of release:{yearOfRelease}</h4>
        </div>
        {actors && (
          <div className="actors-list">
            <h1>actors list </h1>
            {actors.map((currentActor) => {
              const { name, movies } = currentActor;
              return (
                <div key={currentActor.id}>
                  <h3>name: {name}</h3>
                </div>
              );
            })}
            {producer && <h3>producer name: {producer.name}</h3>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
