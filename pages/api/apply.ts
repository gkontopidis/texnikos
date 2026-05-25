import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { sendApplicationNotificationEmail } from "@/lib/mail/emailService";
import Job from "@/models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    jobId,
    jobTitle,
    employerEmail,
    applicantName,
    applicantEmail,
    applicantPhone,
    applicantMessage,
  } = req.body ?? {};

  if (!jobId || !applicantName || !applicantEmail || !applicantPhone) {
    return res.status(400).json({ error: "Missing required application fields." });
  }

  try {
    await connectDB();

    // 1. Save to database
    await Application.create({
      jobId,
      applicantName,
      applicantEmail,
      applicantPhone,
      applicantMessage,
    });

    // 2. Increment job applicant count
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantCount: 1 } });

    // 3. Send notification
    await sendApplicationNotificationEmail(employerEmail, applicantName, applicantPhone, jobTitle);

    return res.status(200).json({ message: "Application received and employer notified." });
  } catch (error) {
    console.error("Application error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
