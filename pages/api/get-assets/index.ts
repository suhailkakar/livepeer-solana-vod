import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  let streams = await db.collection("assets").find().toArray();

  res.status(200).json(streams);
}
