import { Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { Movie } from '../models/movie';

export const deleteMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new NotFoundError('movie not found');
  }
  //if this web app was going into production, I would have written the code to find the actors and the producers,that have worked in the movie,
  // and deleted the movieid in the respective documents, however, not doing so does not result in any error, when the actor/producer data is fetched even if the movie document is not available.however, the downside of not implementing the code is just the memory occupied by the movieid which should be way less then 1kb.

  await Movie.findByIdAndDelete(movieId);
  return res.status(204).send({ message: 'movie deleted' });
};
