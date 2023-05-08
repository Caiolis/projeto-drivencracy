import { Router } from 'express';
import { validateChoice, validateGetChoices, validateVote } from '../middlewares/validateChoice.middleware.js';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import { getChoice, postChoice, postVote } from '../controllers/choice.controller.js';
import { choiceSchema } from '../schemas/choice.schema.js';

const choiceRouter = Router();

choiceRouter.post('/choice', validateSchema(choiceSchema), validateChoice, postChoice);
choiceRouter.post('/choice/:id/vote', validateVote, postVote);
choiceRouter.get('/poll/:id/choice', validateGetChoices, getChoice);

export default choiceRouter;