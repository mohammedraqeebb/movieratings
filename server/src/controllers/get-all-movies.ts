import { Request, Response } from 'express';
import { Movie } from '../models/movie';

export const getAllMovies = async (req: Request, res: Response) => {
  const existingMovies = await Movie.find({});

  // I would have preferred to implement some algorithm here that sends something like trending movies, most viewed movies;

  return res.status(200).send({ movies: existingMovies });
};
