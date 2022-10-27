import { app } from './app';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function startServer() {
  if (!process.env.MONGO_URI) {
    throw new Error('mongo uri not defined');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('jwt secret not defined');
  }

  await mongoose
    .connect(process.env.MONGO_URI)
    .catch(() => console.log('error in connecting mongodb'));
  console.log('connected to db');

  app.listen(process.env.PORT, () => {
    console.log(`server listening to ${process.env.PORT}`);
  });
}

startServer();

export const JWT_SECRET = process.env.JWT_SECRET;
