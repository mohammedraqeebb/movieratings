import { Producer } from './../models/producer';
import { Request, Response } from 'express';

export const searchProducer = async (req: Request, res: Response) => {
  const { searchProducerField } = req.body;

  if (searchProducerField === '') {
    return res.status(200).send({
      producers: [],
      producersListLength: 0,
    });
  }

  const producersList = await Producer.find({
    name: { $regex: searchProducerField, $options: 'i' },
  });

  return res.status(200).send({
    producers: producersList,
    producersListLength: producersList.length,
  });
};
