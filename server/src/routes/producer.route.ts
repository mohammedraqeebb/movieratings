import { Router } from 'express';
import { createProducer } from '../controllers/create-producer';
import { searchProducer } from '../controllers/search-producers';
import { requireAuth } from '../middlewares/require-auth';

export const producerRouter = Router();

producerRouter.post('/producer', requireAuth, createProducer);
producerRouter.post('/searchproducer', requireAuth, searchProducer);
