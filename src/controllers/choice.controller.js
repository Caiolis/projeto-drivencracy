import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function postChoice(req, res) {
  const { title, pollId } = req.body;
  const sendableObject = {title, pollId: new ObjectId(pollId)};

  try {
    await db.collection('choice').insertOne(sendableObject);
    res.status(201).send(sendableObject);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getChoice(req, res) {
  const { id } = req.params;
  try {
    const choicesArray = await db.collection('choice').find({ pollId: new ObjectId(id) }).toArray();
    return res.status(200).send(choicesArray);
  } catch(err) {
    res.status(500).send(err.message);
  }
};