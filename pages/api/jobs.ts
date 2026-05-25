import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
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
    await Job.updateMany(
      { 
        expiresAt: { $exists: true, $ne: null, $lt: now }, 
        status: { $ne: "expired" } 
      },
      { status: "expired" }
    );

    // 2. Send expiration reminders
    const expiringJobs = await Job.find({
      expiresAt: { $exists: true, $ne: null, $lt: threeDaysFromNow, $gt: now },
      status: "active",
      expirationNotified: false
    });

    for (const job of expiringJobs) {
      await sendExpirationReminderEmail(job.contactEmail, job.manageToken, job.title);
      await Job.updateOne({ _id: job._id }, { expirationNotified: true });
    }
    
    // Logic: 
    // 1. Show all 'active' jobs (immediate)
    // 2. Show 'scheduled' jobs only if now >= publishAt
    const jobs = await Job.find({
      $or: [
        { status: "active" },
        { 
          status: "scheduled", 
          publishAt: { $lte: now } 
        }
      ]
    }).sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
    });
  }
}