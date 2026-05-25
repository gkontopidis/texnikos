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
        // 1. Check if plan is free
        if (job.plan === "free") {
          return res.status(403).json({ 
            success: false, 
            message: "Η ανανέωση δεν είναι διαθέσιμη για δωρεάν αγγελίες. Αναβαθμίστε την αγγελία σας για αυτή τη λειτουργία." 
          });
        }

        // 2. Check for 24h limit (using createdAt as the reference for the last bump)
        const now = new Date();
        const lastRefresh = new Date(job.createdAt);
        const hoursSinceLastRefresh = (now.getTime() - lastRefresh.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastRefresh < 24) {
          const hoursRemaining = Math.ceil(24 - hoursSinceLastRefresh);
          return res.status(429).json({ 
            success: false, 
            message: `Μπορείτε να ανανεώσετε την αγγελία σας ξανά σε ${hoursRemaining} ώρες.` 
          });
        }

        job.createdAt = now;
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