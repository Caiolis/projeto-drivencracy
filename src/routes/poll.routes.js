import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { pollSchema } from '../schemas/poll.schema.js';
import { createPoll } from '../controllers/poll.controller.js';

const pollRouter = Router();

pollRouter.post('/poll', validateSchema(pollSchema), createPoll);
pollRouter.get('/poll', );

export default pollRouter;