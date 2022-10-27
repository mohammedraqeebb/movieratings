import { Request, Response, NextFunction } from 'express';
import { NotFoundError, UnauthorizedError } from '../errors';
import { Movie } from '../models/movie';

export const isMovieOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const existingMovieId = req.params.movieId;
  const existingMovie = await Movie.findById(existingMovieId);
  if (!existingMovie) {
    throw new NotFoundError('movie not found');
  }

  if (existingMovie.user.toString() !== req.currentUser!.id) {
    throw new UnauthorizedError();
  }
  next();
};
