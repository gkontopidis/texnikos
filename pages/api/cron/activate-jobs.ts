import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import { sendJobActivatedEmail } from "@/lib/mail/emailService";
import AlertSubscription from "@/models/AlertSubscription";
import { sendJobAlertEmail } from "@/lib/mail/alertService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Security: Check for Vercel Cron Secret (optional but recommended)
  // if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return res.status(401).end('Unauthorized');
  // }

  try {
    await connectDB();
    const now = new Date();

    // Find jobs that are 'scheduled' and their publishAt time has passed
    const jobsToActivate = await Job.find({
      status: "scheduled",
      publishAt: { $lte: now }
    });

    console.log(`Cron: Found ${jobsToActivate.length} jobs to activate.`);

    for (const job of jobsToActivate) {
      // 1. Update status to active
      job.status = "active";
      await job.save();

      // 2. Notify employer and subscribers (background)
      try {
        await sendJobActivatedEmail(job.contactEmail, job.manageToken, job.title);
        
        // Notify matching job alert subscribers
        const subscribers = await AlertSubscription.find({ 
          specialty: job.title, 
          location: job.location,
          unsubscribed: false
        });
        
        for (const sub of subscribers) {
          await sendJobAlertEmail(sub.email, job.title, sub._id.toString());
        }
        
        console.log(`Cron: Activated and notified for job: ${job.title}`);
      } catch (err) {
        console.error(`Cron: Error in background tasks for ${job.title}:`, err);
      }
    }

    return res.status(200).json({ 
      success: true, 
      activatedCount: jobsToActivate.length 
    });
  } catch (error) {
    console.error("Cron Job Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
