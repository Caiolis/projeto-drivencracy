import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function validateChoice(req, res, next) {
  const { title, pollId } = req.body;

  // Verify if the poll exists
  const existingPoll = await db.collection('poll').findOne({ _id: new ObjectId(pollId) });
  if(!existingPoll) return res.status(404).send('This poll does not exist');

  // Verify if the title field exists in another choice
  const existingTitle = await db.collection('choice').findOne({ title });
  if(existingTitle) return res.status(409).send('This choice already exists');

  // Verify if the date has already expired
  if(dayjs().isAfter(existingPoll.expireAt, 'day')) return res.status(403).send('This poll has already expired');

  next();
}