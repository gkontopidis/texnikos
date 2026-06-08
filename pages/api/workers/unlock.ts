import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Worker from "@/models/Worker";
import Lead from "@/models/Lead";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { workerId, employerName, employerEmail, employerPhone } = req.body;

    if (!workerId || !employerName || !employerEmail || !employerPhone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Save the lead
    const newLead = new Lead({
      workerId,
      employerName,
      employerEmail,
      employerPhone,
    });
    await newLead.save();

    // Fetch the full worker details to reveal
    const worker = await Worker.findById(workerId).select("contactEmail contactPhone lastName");
    if (!worker) {
      return res.status(404).json({ success: false, message: "Worker not found" });
    }

    // Update worker unlock count or list (optional)
    await Worker.findByIdAndUpdate(workerId, { $addToSet: { unlockedBy: employerEmail } });

    return res.status(200).json({ 
      success: true, 
      contact: {
        email: worker.contactEmail,
        phone: worker.contactPhone,
        lastName: worker.lastName
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
