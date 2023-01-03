import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { Asset } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  let stream = await db.collection("assets").insertOne(req.body);

  res.status(200).json(stream);
}
