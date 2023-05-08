import dayjs from "dayjs";
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

    await db.collection("polls").insertOne(sendableObject);
    return res.status(201).send(sendableObject);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
