import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Worker from "@/models/Worker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;

  try {
    await connectDB();

    const worker = await Worker.findOne({ manageToken: token });
    if (!worker) {
      return res.status(404).json({ success: false, message: "Worker not found" });
    }

    if (req.method === "GET") {
      return res.status(200).json({ success: true, worker });
    }

    if (req.method === "PUT") {
      const allowedFields = [
        "firstName", "lastName", "specialty", "location", 
        "experienceYears", "bio", "contactEmail", "contactPhone", "status"
      ];
      
      const updates = req.body;
      Object.keys(updates).forEach((key) => {
        if (allowedFields.includes(key)) {
          worker[key] = updates[key];
        }
      });

      await worker.save();
      return res.status(200).json({ success: true, worker });
    }

    if (req.method === "DELETE") {
      await Worker.deleteOne({ manageToken: token });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
