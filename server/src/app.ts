import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';

import 'express-async-errors';
import { currentUser } from './middlewares/current-user';
import { errorHandler, NotFoundError } from './errors';
import { userRouter } from './routes/user.route';
import { movieRouter } from './routes/movie.route';
import { actorRouter } from './routes/actor.route';
import { producerRouter } from './routes/producer.route';

const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});
const whitelist = ['http://localhost:3000'];
app.use(bodyParser.json());
app.use(
  cors({
    origin: whitelist,
  })
);
app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);
app.use(currentUser);

app.use('/api', userRouter);
app.use('/api', movieRouter);
app.use('/api', actorRouter);
app.use('/api', producerRouter);

app.all('*', () => {
  throw new NotFoundError('route not found');
});

app.use(errorHandler);

export { app };
