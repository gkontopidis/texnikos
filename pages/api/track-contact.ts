import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { jobId, type } = req.body;

    if (!jobId || !type) {
      return res.status(400).json({ message: "Missing jobId or type" });
    }

    await connectDB();

    // In a real production app, we would have a separate Analytics/Tracking model.
    // For this MVP, we can increment counters directly on the Job model or just log it.
    // Let's log it for now to avoid bloating the Job schema immediately, 
    // but the API is ready for the frontend.
    
    console.log(`[TRACKING] Contact click on job ${jobId}: ${type}`);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[TRACKING ERROR]", error);
    return res.status(500).json({ success: false });
  }
}
