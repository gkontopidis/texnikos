import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import AlertSubscription from "@/models/AlertSubscription";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { email, specialty, location } = req.body;
    
    await AlertSubscription.findOneAndUpdate(
      { email, specialty, location },
      { email, specialty, location },
      { upsert: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}