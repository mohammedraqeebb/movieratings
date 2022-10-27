import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { PasswordManager } from '../util/password-manager';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../server';

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('password and email required');
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('user does not exists,try signing up');
  }
  const passwordCheck = PasswordManager.comparePassword(
    password,
    existingUser.password
  );
  if (!passwordCheck) {
    throw new BadRequestError('wrong password or email');
  }
  const userJwt = jwt.sign(
    { id: existingUser._id, email: existingUser.email },
    JWT_SECRET as string
  );
  req.session = {
    jwt: userJwt,
  };
  res.status(200).send({ user: existingUser });
};
