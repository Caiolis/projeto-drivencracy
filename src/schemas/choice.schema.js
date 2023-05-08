import joi from "joi";

export const choiceSchema = joi.object({
  title: joi.string().required().min(1),
  pollId: joi.string().required().min(1),
});
