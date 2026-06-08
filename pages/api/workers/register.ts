import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Worker from "@/models/Worker";
import { sendWorkerRegistrationAdminNotification, sendWorkerManagementEmail } from "@/lib/mail/emailService";

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
      firstName, lastName, specialty, location, 
      experienceYears, bio, skills, 
      contactEmail, contactPhone, honeypot
    } = req.body;

    // 1. Honeypot check
    if (honeypot) {
      return res.status(400).json({ success: false, message: "Spam detected." });
    }

    if (!firstName || !lastName || !specialty || !location || !contactEmail || !contactPhone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const workerData = {
      firstName, lastName, specialty, location,
      experienceYears: parseInt(experienceYears) || 0,
      bio,
      skills: Array.isArray(skills) ? skills : [],
      contactEmail,
      contactPhone,
      status: "pending",
    };

    const newWorker = new Worker(workerData);
    await newWorker.save();

    // Notify Admin and Worker in background
    (async () => {
      try {
        await sendWorkerRegistrationAdminNotification(firstName, lastName, specialty, location);
        await sendWorkerManagementEmail(contactEmail, newWorker.manageToken, firstName);
      } catch (err) {
        console.error("Background email process error:", err);
      }
    })();

    return res.status(201).json({
      success: true,
      worker: newWorker,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
