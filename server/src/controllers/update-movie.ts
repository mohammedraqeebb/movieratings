import { Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { NotFoundError } from '../errors/not-found-error';
import { Actor } from '../models/actor';
import { Movie } from '../models/movie';
import { Producer } from '../models/producer';
import { addMovieToDocument } from './create-movie';
// import { getValidatedActorsList, validateProducer } from './create-movie';

const removeMovieFromDocument = async (
  model: string,
  documentId: string,
  movieId: string
) => {
  movieId = movieId.toString();
  if (model === 'actor') {
    const actorDocument = await Actor.findById(documentId);
    if (!actorDocument) {
      throw new NotFoundError('actor not found');
    }
    const actorUpdatedMovies = actorDocument.movies.filter(
      (id) => id !== movieId
    );
    actorDocument.movies = actorUpdatedMovies;
    await actorDocument.save();
  }
  if (model === 'producer') {
    const producerDocument = await Producer.findById(documentId);
    if (!producerDocument) {
      throw new NotFoundError('producer not found');
    }
    const producerUpdatedMovies = producerDocument.movies.filter(
      (id) => id !== movieId
    );
    producerDocument.movies = producerUpdatedMovies;
    await producerDocument.save();
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  const existingMovie = await Movie.findById(movieId);
  if (!existingMovie) {
    throw new NotFoundError('movie not found');
  }

  const { name, yearOfRelease, plot, poster, actors, producer } = req.body;

  const oldActorsList = existingMovie.actors.map((id) => id.toString());
  const oldProducer = existingMovie.producer.toString();
  const updatedActorsList = [];
  const removedActorsList = [];
  const oldActorsHashSet = new Set();
  const inputActorsHashSet = new Set();

  for (const actor of oldActorsList) {
    oldActorsHashSet.add(actor);
  }

  for (const actor of actors) {
    if (!oldActorsHashSet.has(actor)) {
      updatedActorsList.push(actor);
    }
    inputActorsHashSet.add(actors);
  }

  for (const actor of oldActorsList) {
    if (!inputActorsHashSet.has(actor)) {
      removedActorsList.push(actor);
    }
  }

  //the below could be more optimized by using promise.all

  for (const actor of updatedActorsList) {
    await addMovieToDocument('actor', actor, existingMovie._id);
  }
  for (const actor of removedActorsList) {
    await removeMovieFromDocument('actor', actor, existingMovie._id);
  }

  if (oldProducer !== producer) {
    await removeMovieFromDocument('producer', oldProducer, existingMovie._id);
    await addMovieToDocument('producer', producer, existingMovie._id);
  }
  existingMovie.set({
    name,
    yearOfRelease,
    plot,
    poster,
    actors,
    producer,
    user: req.currentUser!.id,
  });
  await existingMovie.save();

  return res.status(200).send({ movie: existingMovie });
};
