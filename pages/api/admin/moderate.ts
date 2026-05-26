import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Security Note: In a real app, this would require admin authentication!
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { jobId, action, notes } = req.body; // action: 'approve' or 'reject'

    await connectDB();

    if (action === "approve") {
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ message: "Job not found" });
      
      await Job.findByIdAndUpdate(jobId, {
        status: "active",
        moderationNotes: notes
      });
    } else {
      await Job.findByIdAndUpdate(jobId, {
        status: "rejected",
        moderationNotes: notes
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
