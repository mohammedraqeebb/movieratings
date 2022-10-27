import React, { useEffect, useState } from 'react';
import useRequest from '../../hooks/use-request';
import Movie from '../../components/movie-details/movie.component';
import './home.styles.scss';

const Home = () => {
  const { doRequest, errors } = useRequest({
    url: 'http://localhost:5000/api/movies/',
    method: 'get',
    onSuccess: (data) => {
      setMovies(data.movies);
    },
  });
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    doRequest();
  }, []);
  return (
    <div className="movie_container">
      {movies && movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
    </div>
  );
};

export default Home;
