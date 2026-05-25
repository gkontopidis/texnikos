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
          job.title = data.title || job.title;
          job.company = data.company || job.company;
          job.location = data.location || job.location;
          job.description = data.description || job.description;
          job.salary = data.salary || job.salary;
          job.contactPhone = data.contactPhone || job.contactPhone;
          job.category = data.category || job.category;
          job.urgent = typeof data.urgent === "boolean" ? data.urgent : job.urgent;
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