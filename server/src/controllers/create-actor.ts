import { Request, Response } from 'express';
import { Actor } from '../models/actor';

export const createActor = async (req: Request, res: Response) => {
  const { name, gender, dob, bio } = req.body;
  const actor = Actor.build({
    name,
    gender,
    dob,
    bio,
    user: req.currentUser!.id,
  });
  await actor.save();
  return res.status(201).send({ actor });
};
