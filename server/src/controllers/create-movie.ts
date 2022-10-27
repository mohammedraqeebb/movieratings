import { Request, Response } from 'express';
import { isValidObjectId } from '../middlewares/is-valid-objectid';
import { Movie } from '../models/movie';
import { Actor } from '../models/actor';
import { Producer } from '../models/producer';
import { BadRequestError, NotFoundError } from '../errors';

// export const getValidatedActorsList = (actors: string[]): Promise<string[]> => {
//   return new Promise((resolve, reject) => {
//     const validatedList = [];
//     for (const actor of actors) {
//       if (isValidObjectId(actor)) {
//         const existingActor = Actor.findById(actor);
//         if (existingActor) {
//           validatedList.push(existingActor);
//         }
//       }
//     }
//     //@ts-ignore
//     resolve(validatedList);
//   });
// };

// export const validateProducer = async (producerId: string) => {
//   console.log('producer id', producerId);
//   console.log('is valid producer id', isValidObjectId(producerId));
//   if (isValidObjectId(producerId)) {
//     const existingProducer = await Producer.findById(producerId);
//     console.log(existingProducer);
//     if (existingProducer) {
//       return true;
//     }
//   }
//   return false;
// };

export const addMovieToDocument = async (
  model: string,
  documentId: string,
  movieId: string
) => {
  movieId = movieId.toString();
  if (model === 'actor') {
    const actorDocument = await Actor.findById(documentId);
    if (!actorDocument) {
      throw new NotFoundError(`actor not found ${documentId}`);
    }
    actorDocument.movies.push(movieId);
    await actorDocument.save();
  }
  if (model === 'producer') {
    const producerDocument = await Producer.findById(documentId);
    if (!producerDocument) {
      throw new NotFoundError(`producer not found ${documentId}`);
    }
    producerDocument.movies.push(movieId);
    await producerDocument.save();
  }
};

export const createMovie = async (req: Request, res: Response) => {
  const { name, yearOfRelease, plot, poster, actors, producer } = req.body;

  const movie = Movie.build({
    name,
    yearOfRelease,
    plot,
    poster,
    actors,
    producer,
    user: req.currentUser!.id,
  });
  await movie.save();

  for (const actor of actors) {
    await addMovieToDocument('actor', actor, movie._id);
  }

  addMovieToDocument('producer', producer, movie._id);

  return res.status(201).send({ movie });

  //the below approach of validating the ids can be made use of, if we do not want to trust the client, of course we don't want to, however the downside is that it adds latency; also,the same approach could be implemented in the movie update route, however I have not

  // const validatedActors = await getValidatedActorsList(actors);
  // const validatedProducer = await validateProducer(producer);
  //  if (!validatedProducer) {
  //    throw new BadRequestError('producer profile does not exist');
  //  }

  // const movie = Movie.build({
  //   name,
  //   yearOfRelease,
  //   plot,
  //   poster,
  //   actors: validatedActors,
  //   producer,
  //   user: req.currentUser!.id,
  // });
  // await movie.save();
  // for (const actor of validatedActors) {
  //    await addMovieToDocument('actor', actor, movie._id);
  // }

  // addMovieToDocument('producer', producer, movie._id);

  // return res.status(201).send({ movie });
};
