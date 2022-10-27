import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './../server';

interface UserPayload {
  id: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      JWT_SECRET as string
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  return next();
};
