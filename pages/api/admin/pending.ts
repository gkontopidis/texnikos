import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const pendingJobs = await Job.find({ status: "pending" }).sort({ createdAt: -1 });
    console.log("DEBUG: Pending jobs count:", pendingJobs.length);
    console.log("DEBUG: Pending jobs data:", pendingJobs);
    return res.status(200).json(pendingJobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}