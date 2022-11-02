import express from 'express';
import { createMovie } from '../controllers/create-movie';
import { deleteMovie } from '../controllers/delete-movie';
import { updateMovie } from '../controllers/update-movie';
import { readMovie } from '../controllers/read-movie';
import { requireAuth } from '../middlewares/require-auth';
import { getAllMovies } from '../controllers/get-all-movies';
import { isMovieOwner } from '../middlewares/is-movie-owner';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { isValidObjectId } from '../middlewares/is-valid-objectid';

export const movieRouter = express.Router();

movieRouter.post(
  '/movie',
  requireAuth,
  [
    body('name')
      .isLength({ min: 1 })
      .withMessage('movie name should contain atleast one character'),
    body('yearOfRelease').isDate().withMessage('enter date format'),
    body('plot')
      .isLength({ min: 10 })
      .withMessage('plot should contain atleast ten characters'),
    body('poster').isURL().withMessage('poster should be url'),
    body('producer')
      .custom((id) => isValidObjectId(id) === true)
      .withMessage('enter a producer'),
  ],
  validateRequest,
  createMovie
);
movieRouter.put(
  '/movie/:movieId',
  requireAuth,
  isMovieOwner,
  [
    body('name')
      .isLength({ min: 1 })
      .withMessage('movie name should contain atleast one character'),
    body('yearOfRelease').isDate().withMessage('enter date format'),
    body('plot')
      .isLength({ min: 10 })
      .withMessage('plot should contain atleast ten characters'),
    body('poster').isURL().withMessage('poster should be url'),
    body('producer')
      .custom((id) => isValidObjectId(id) === true)
      .withMessage('enter a producer'),
  ],
  validateRequest,
  updateMovie
);
movieRouter.post('/movie/:movieId', requireAuth, isMovieOwner, deleteMovie);
movieRouter.get('/movie/:movieId', readMovie);
movieRouter.get('/movies', getAllMovies);
