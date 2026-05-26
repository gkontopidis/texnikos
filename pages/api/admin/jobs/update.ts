import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

const ALLOWED_FIELDS = [
  "title", "company", "location", "salary", "duration", "salaryMin", "salaryMax", 
  "salaryText", "description", "category", "urgent", "fullTime", 
  "featured", "contactPhone", "contactEmail", "status", "plan", 
  "isPaid", "moderationNotes", "featuredUntil", "expiresAt", 
  "responseRate"
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { jobId, ...updateData } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: "Job ID is required" });
    }

    // Filter and Validate update data
    const filteredUpdateData: any = {};
    for (const key of ALLOWED_FIELDS) {
      if (key in updateData) {
        filteredUpdateData[key] = updateData[key];
      }
    }

    // Basic status validation
    if (filteredUpdateData.status && !["active", "closed", "expired", "rejected", "scheduled", "pending-verification"].includes(filteredUpdateData.status)) {
        return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const job = await Job.findByIdAndUpdate(jobId, filteredUpdateData, { new: true });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
