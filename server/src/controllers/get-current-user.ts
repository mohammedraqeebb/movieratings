import { Request, Response } from 'express';

export const getCurrentUser = (req: Request, res: Response) => {
  const currentUser = req.currentUser;
  if (!currentUser) {
    return res.status(200).send({ currentUser: null });
  }
  return res.status(200).send({ currentUser });
};
