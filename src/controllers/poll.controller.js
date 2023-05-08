import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function createPoll(req, res) {
  const { title, expireAt } = req.body;
  const sendableObject = { title, expireAt };

  try {
    // Verify if the expireAt field exists, if not then sets 1 month to expire
    if (!expireAt) {
      let today = dayjs();
      const expire = today.add(1, "month").format("YYYY-MM-DD HH:mm");
      sendableObject.expireAt = expire;
    }

    await db.collection("poll").insertOne(sendableObject);
    return res.status(201).send(sendableObject);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPoll(req, res) {
  try {
    const polls = await db.collection("poll").find().toArray();
    return res.send(polls);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getResults(req, res) {
  const { id } = req.params;
  let sendableObject = {};

  try {
    const votes = await db.collection("votes").find().toArray();
    const validVotes = {};
    const result = [];

    const poll = await db.collection("poll").findOne({ _id: new ObjectId(id) });
    if (!poll) return res.sendStatus(404);

    // Count votes
    votes.forEach((vote) => {
      if (validVotes[votes.choiceId]) validVotes[votes.choiceId]++;
      else validVotes[votes.choiceId] = 1;

      for (votes.choiceId in validVotes)
        result.push({
          title: vote.choiceId,
          count: validVotes[votes.choiceId],
        });
    });

    result.sort((a, b) => b.count - a.count);

    const choice = await db
      .collection("choice")
      .findOne({ _id: new ObjectId(result[0].title) });

    sendableObject = {
      _id: choice.pollId,
      title: poll.title,
      expireAt: poll.expireAt,
      result: {
        title: choice.title,
        votes: result[0].count,
      },
    };

    res.status(200).send(sendableObject);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
