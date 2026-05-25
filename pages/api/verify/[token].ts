import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import AlertSubscription from "@/models/AlertSubscription";
import { sendJobPostedEmail } from "@/lib/mail/emailService";
import { sendJobAlertEmail } from "@/lib/mail/alertService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token) return res.status(400).json({ message: "Token missing" });

  try {
    await connectDB();
    const job = await Job.findOne({ manageToken: token });

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.emailVerified) return res.status(200).json({ message: "Already verified" });

    // Mark as verified
    job.emailVerified = true;
    job.status = job.plan === "free" ? "pending" : "active";
    
    // Set publish/expire dates based on plan
    const now = new Date();
    job.publishAt = job.plan === "free" 
      ? new Date(now.getTime() + 72 * 60 * 60 * 1000) 
      : now;
    job.expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    if (job.plan !== "free") job.featuredUntil = job.expiresAt;

    await job.save();

    // Trigger post-verification emails (background)
    (async () => {
      try {
        await sendJobPostedEmail(job.contactEmail, job.manageToken, job.title);
        const subscribers = await AlertSubscription.find({ 
          specialty: job.title, 
          location: job.location 
        });
        for (const sub of subscribers) {
          await sendJobAlertEmail(sub.email, job.title);
        }
      } catch (err) {
        console.error("Verification email background error:", err);
      }
    })();

    return res.status(200).json({ success: true, message: "Verified!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
