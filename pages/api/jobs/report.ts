import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import AbuseReport from "@/models/AbuseReport";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();
    const { jobId, reason, description } = req.body;

    await AbuseReport.create({
      jobId,
      reason,
      description,
      reporterIP: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    });

    return res.status(200).json({ success: true, message: "Αναφορά εστάλη." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
