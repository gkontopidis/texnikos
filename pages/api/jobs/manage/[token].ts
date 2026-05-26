import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { token } = req.query;

  try {
    await connectDB();
    const job = await Job.findOne({ manageToken: token });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (req.method === "GET") {
      return res.status(200).json({ success: true, job });
    }

    const { action, data } = req.body; // 'close', 'refresh', 'update'

    switch (action) {
      case "close":
        job.status = "closed";
        break;
      case "refresh":
        // Extend expiration by 30 days
        const now = new Date();
        job.expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        job.status = "active"; // Ensure it's active
        break;
      case "update":
        if (data) {
          const allowedUpdates = [
            "title", "company", "location", "description", 
            "salary", "contactPhone", "category", "urgent",
            "duration", "fullTime"
          ];
          
          for (const key of allowedUpdates) {
            if (key in data) {
              // Update duration properly if it's the new structured object
              if (key === "duration") {
                job.duration = {
                  type: data.duration.type || job.duration?.type,
                  amount: data.duration.amount || job.duration?.amount,
                  unit: data.duration.unit || job.duration?.unit
                };
              } else {
                job[key] = data[key];
              }
            }
          }
        }
        break;
      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    await job.save();
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}