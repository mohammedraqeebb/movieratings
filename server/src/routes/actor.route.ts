import { Router } from 'express';
import { createActor } from '../controllers/create-actor';
import { searchActor } from '../controllers/search-actors';
import { requireAuth } from '../middlewares/require-auth';

export const actorRouter = Router();

actorRouter.post('/actor', requireAuth, createActor);
actorRouter.post('/searchactor', requireAuth, searchActor);
