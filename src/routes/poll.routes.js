import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { pollSchema } from "../schemas/poll.schema.js";
import {
  createPoll,
  getPoll,
  getResults,
} from "../controllers/poll.controller.js";

const pollRouter = Router();

pollRouter.post("/poll", validateSchema(pollSchema), createPoll);
pollRouter.get("/poll", getPoll);
pollRouter.get("/poll/:id/result", getResults);

export default pollRouter;
