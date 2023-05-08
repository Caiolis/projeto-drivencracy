import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function validateChoice(req, res, next) {
  const { title, pollId } = req.body;

  try {
    // Verify if the poll exists
    const existingPoll = await db
      .collection("poll")
      .findOne({ _id: new ObjectId(pollId) });
    if (!existingPoll) return res.status(404).send("This poll does not exist");

    // Verify if the title field exists in another choice
    const existingTitle = await db.collection("choice").findOne({ title });
    if (existingTitle)
      return res.status(409).send("This choice already exists");

    // Verify if the date has already expired
    if (dayjs().isAfter(existingPoll.expireAt, "day"))
      return res.status(403).send("This poll has already expired");

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateVote(req, res, next) {
  const { id } = req.params;

  try {
    // Verify if the choice exists
    const existingChoice = await db
      .collection("choice")
      .findOne({ _id: new ObjectId(id) });
    if (!existingChoice) return res.status(404).send("This choice does not exist");

    // Verify if the date has already expired
    if (dayjs().isAfter(existingChoice.expireAt, "day"))
      return res.status(403).send("This poll has already expired");

    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function validateGetChoices(req, res, next) {
  const { id } = req.params;
  try {
    // Validate if the poll exists
    const existingPoll = await db.collection("poll").findOne({ _id: new ObjectId(id) });
    if(!existingPoll) return res.status(404).send("This poll does not exist")
    
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
