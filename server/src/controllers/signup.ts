import express, { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { BadRequestError } from './../errors/bad-request-error';
import { JWT_SECRET } from '../server';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('password and email required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('user exists,try signing in');
  }

  const user = User.build({ name, email, password });
  await user.save();

  const userJwt = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET as string
  );
  req.session = {
    jwt: userJwt,
  };

  return res.status(201).send({ user });
};
