import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import AlertSubscription from "@/models/AlertSubscription";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "ID missing" });

  try {
    await connectDB();
    await AlertSubscription.findByIdAndUpdate(id, { unsubscribed: true });
    return res.status(200).send("Η εγγραφή σας ακυρώθηκε επιτυχώς.");
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
