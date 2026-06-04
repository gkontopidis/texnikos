import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import "@/models/Company"; // Side-effect import to ensure model registration
import Company from "@/models/Company";
import { sendExpirationReminderEmail } from "@/lib/mail/emailService";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    // 1. Mark expired jobs (only if expiresAt exists and is in the past)
    try {
      await Job.updateMany(
        { 
          expiresAt: { $exists: true, $ne: null, $lt: now }, 
          status: { $ne: "expired" } 
        },
        { status: "expired" }
      );
    } catch (e) {
      console.error("Error updating expired jobs:", e);
    }

    // 2. Send expiration reminders
    try {
      const expiringJobs = await Job.find({
        expiresAt: { $exists: true, $ne: null, $lt: threeDaysFromNow, $gt: now },
        status: "active",
        expirationNotified: false
      });

      for (const job of expiringJobs) {
        await sendExpirationReminderEmail(job.contactEmail, job.manageToken, job.title);
        await Job.updateOne({ _id: job._id }, { expirationNotified: true });
      }
    } catch (e) {
      console.error("Error sending expiration reminders:", e);
    }
    
    // Logic: 
    // 1. Show all 'active' jobs (immediate)
    // 2. Show 'scheduled' jobs only if now >= publishAt
    // Priority: Urgent (⚡) > Featured (⭐) > Free (standard)
    const jobs = await Job.find({
      $and: [
        {
          $or: [
            { status: "active" },
            { 
              status: "scheduled", 
              publishAt: { $lte: now } 
            }
          ]
        },
        {
          $or: [
            { expiresAt: { $exists: false } },
            { expiresAt: null },
            { expiresAt: { $gt: now } }
          ]
        }
      ]
    }).populate("companyId", "slug").sort({ urgent: -1, featured: -1, createdAt: -1 });

    // NEW: Get counts for statistics
    const activeJobCount = await Job.countDocuments({ status: "active" });
    const closedJobCount = await Job.countDocuments({ status: "closed" });
    
    // Count unique emails in AlertSubscription as "technicians"
    let technicianCount = 0;
    try {
      const AlertSubscription = (await import("@/models/AlertSubscription")).default;
      technicianCount = (await AlertSubscription.distinct("email", { unsubscribed: false })).length;
    } catch (e) {
      console.error("Error getting technician count:", e);
    }

    return res.status(200).json({
      jobs,
      stats: {
        active: activeJobCount,
        closed: closedJobCount,
        technicians: technicianCount
      }
    });
  } catch (error: any) {
    console.error("API Jobs Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
}