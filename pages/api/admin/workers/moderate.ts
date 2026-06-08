import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Worker from "@/models/Worker";
import { sendWorkerApprovedEmail } from "@/lib/mail/emailService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();
    const { workerId, action } = req.body;

    const status = action === "approve" ? "active" : "rejected";
    const worker = await Worker.findByIdAndUpdate(workerId, { status }, { new: true });

    if (!worker) return res.status(404).json({ success: false, message: "Worker not found" });

    if (action === "approve") {
      try {
        await sendWorkerApprovedEmail(worker.contactEmail, worker.firstName);
      } catch (emailError) {
        console.error("Failed to send approval email:", emailError);
      }
    }

    return res.status(200).json({ success: true, worker });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
