import { NotFoundError } from './../errors/not-found-error';
import { Movie } from './../models/movie';
import { Request, Response } from 'express';

import { BadRequestError } from '../errors';
import { isValidObjectId } from '../middlewares/is-valid-objectid';

export const readMovie = async (req: Request, res: Response) => {
  const existingMovieId = req.params.movieId;
  if (!isValidObjectId(existingMovieId)) {
    throw new BadRequestError('invalid object id');
  }
  const existingMovie = await Movie.findById(existingMovieId).populate(
    'actors producer'
  );

  if (!existingMovie) {
    throw new NotFoundError('movie not found');
  }

  res.status(200).send({ movie: existingMovie });
};
