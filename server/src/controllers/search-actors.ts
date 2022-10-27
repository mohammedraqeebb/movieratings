import { Request, Response } from 'express';
import { Actor } from '../models/actor';

export const searchActor = async (req: Request, res: Response) => {
  const { searchActorField } = req.body;
  if (searchActorField === '') {
    return res.status(200).send({ actors: [], actorsLength: 0 });
  }

  const actorList = await Actor.find({
    name: { $regex: searchActorField, $options: 'i' },
  });
  return res
    .status(200)
    .send({ actors: actorList, actorsLength: actorList.length });
};
