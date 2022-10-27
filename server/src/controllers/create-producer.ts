import { Request, Response } from 'express';
import { Producer } from '../models/producer';

export const createProducer = async (req: Request, res: Response) => {
  const { name, gender, dob, bio } = req.body;
  const producer = Producer.build({
    name,
    gender,
    dob,
    bio,
    user: req.currentUser!.id,
  });
  await producer.save();
  return res.status(201).send({ producer });
};
