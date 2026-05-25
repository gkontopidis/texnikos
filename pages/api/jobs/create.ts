import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import AlertSubscription from "@/models/AlertSubscription";
import { sendJobPostedEmail } from "@/lib/mail/emailService";
import { sendJobAlertEmail } from "@/lib/mail/alertService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const jobData = req.body;
    const { plan, contactEmail, title } = jobData;
    
    const now = new Date();
    const publishAt = plan === "free" 
      ? new Date(now.getTime() + 72 * 60 * 60 * 1000) 
      : now;
      
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days default
    const featuredUntil = (plan === "featured" || plan === "urgent") 
      ? expiresAt 
      : null;

    const newJob = new Job({
      ...jobData,
      status: "pending",
      publishAt,
      expiresAt,
      featuredUntil,
      createdAt: now,
    });

    await newJob.save();

    // Send email notification to employer
    await sendJobPostedEmail(contactEmail, newJob.manageToken, title);

    // Notify matching job alert subscribers
    const subscribers = await AlertSubscription.find({ 
      specialty: newJob.title, 
      location: newJob.location 
    });
    
    for (const sub of subscribers) {
      await sendJobAlertEmail(sub.email, newJob.title);
    }

    return res.status(201).json({
      success: true,
      job: newJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
