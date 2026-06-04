import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import "@/models/Company"; // Side-effect import to ensure model registration
import Company from "@/models/Company";
import { sendExpirationReminderEmail } from "@/lib/mail/emailService";

// Simple in-memory cache for statistics (15 minutes TTL)
let cachedStats: { active: number; closed: number; technicians: number; lastUpdated: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000; 

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    // 1. Background tasks (Maintenance)
    // Run these only occasionally or in the background to not block the main request
    if (Math.random() < 0.1) { // 10% chance to run maintenance on a list request
        (async () => {
            try {
                // Mark expired jobs
                await Job.updateMany(
                    { expiresAt: { $exists: true, $ne: null, $lt: now }, status: { $ne: "expired" } },
                    { status: "expired" }
                );
                // Send expiration reminders
                const expiringJobs = await Job.find({
                    expiresAt: { $exists: true, $ne: null, $lt: threeDaysFromNow, $gt: now },
                    status: "active",
                    expirationNotified: false
                });
                for (const job of expiringJobs) {
                    await sendExpirationReminderEmail(job.contactEmail, job.manageToken, job.title);
                    await Job.updateOne({ _id: job._id }, { expirationNotified: true });
                }
            } catch (e) { console.error("Maintenance error:", e); }
        })();
    }
    
    // 2. Fetch Jobs (Optimized with lean() and projection)
    const jobsPromise = Job.find({
      $and: [
        {
          $or: [
            { status: "active" },
            { status: "scheduled", publishAt: { $lte: now } }
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
    })
    .populate("companyId", "slug")
    .sort({ urgent: -1, featured: -1, createdAt: -1 })
    .limit(100) // Safety limit
    .lean();

    // 3. Fetch or Cache Statistics
    let stats;
    const currentTime = Date.now();
    
    if (cachedStats && (currentTime - cachedStats.lastUpdated < CACHE_TTL)) {
        stats = {
            active: cachedStats.active,
            closed: cachedStats.closed,
            technicians: cachedStats.technicians
        };
    } else {
        // Fetch fresh stats in parallel
        const [activeJobCount, closedJobCount, technicianCount] = await Promise.all([
            Job.countDocuments({ status: "active" }),
            Job.countDocuments({ status: "closed" }),
            (async () => {
                try {
                    const AlertSubscription = (await import("@/models/AlertSubscription")).default;
                    return (await AlertSubscription.distinct("email", { unsubscribed: false })).length;
                } catch (e) { return 0; }
            })()
        ]);
        
        stats = { active: activeJobCount, closed: closedJobCount, technicians: technicianCount };
        // Update cache
        cachedStats = { ...stats, lastUpdated: currentTime };
    }

    const jobs = await jobsPromise;

    return res.status(200).json({
      jobs,
      stats
    });
  } catch (error: any) {
    console.error("API Jobs Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    });
  }
}