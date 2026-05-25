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

    const {
      title, company, location, salary, duration, description, 
      contactEmail, contactPhone, fullTime, urgent, featured, 
      plan, isPaid, honeypot // Added honeypot
    } = req.body;

    // 1. Honeypot check
    if (honeypot) {
        return res.status(400).json({ success: false, message: "Spam detected." });
    }

    // 2. Disposable email blocking
    const blockedDomains = ['mailinator.com', 'guerrillamail.com', '10minutemail.com'];
    const domain = contactEmail.split('@')[1];
    if (blockedDomains.includes(domain)) {
        return res.status(400).json({ success: false, message: "Email domain not allowed." });
    }

    // 3. Duplicate detection (same email posting in last 15 mins)
    const recentJob = await Job.findOne({ 
        contactEmail, 
        createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) } 
    });
    if (recentJob) {
        return res.status(429).json({ success: false, message: "Πρέπει να περιμένετε 15 λεπτά πριν δημοσιεύσετε ξανά." });
    }

    // Validate required fields
    if (!title || !company || !location || !contactEmail) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const now = new Date();

    // Check if employer is already verified
    const existingJob = await Job.findOne({ contactEmail, emailVerified: true });
    const isVerified = !!existingJob;

    // Strict field whitelisting for security
    const jobData = {
      title, company, location, salary, duration, description, 
      contactEmail, contactPhone,
      fullTime: !!fullTime,
      urgent: !!urgent,
      featured: !!featured,
      plan,
      isPaid: !!isPaid,
      status: isVerified ? (plan === "free" ? "pending" : "active") : "pending-verification",
      emailVerified: isVerified,
      audit: {
        creatorIP: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        userAgent: req.headers["user-agent"],
        createdAt: now,
      },
      createdAt: now,
    };

    const newJob = new Job(jobData);
    await newJob.save();

    // Fire-and-forget: Do not await these to prevent blocking the response
    (async () => {
      try {
        if (isVerified) {
          await sendJobPostedEmail(contactEmail, newJob.manageToken, title);
        } else {
          await sendVerificationEmail(contactEmail, newJob.manageToken, title);
        }

        // Notify matching job alert subscribers
        const subscribers = await AlertSubscription.find({ 
          specialty: newJob.title, 
          location: newJob.location,
          unsubscribed: false
        });
        
        for (const sub of subscribers) {
          await sendJobAlertEmail(sub.email, newJob.title, sub._id.toString());
        }
      } catch (err) {
        console.error("Background email process error:", err);
      }
    })();

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
