import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Worker from "@/models/Worker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();
    const { specialty, location } = req.query;
    
    let query: any = { status: "active" };
    if (specialty) query.specialty = specialty;
    if (location && location !== "Ολόκληρη η Ελλάδα") query.location = { $regex: location, $options: "i" };

    const fullWorkers = await Worker.find(query)
      .select("firstName lastName specialty location experienceYears bio skills createdAt")
      .sort({ createdAt: -1 });

    const finalWorkers = fullWorkers.map(worker => ({
      _id: worker._id,
      firstName: worker.firstName,
      lastNameInitial: worker.lastName ? worker.lastName.charAt(0) + "." : "",
      specialty: worker.specialty,
      location: worker.location,
      experienceYears: worker.experienceYears,
      bio: worker.bio,
      skills: worker.skills,
      createdAt: worker.createdAt
    }));

    return res.status(200).json({ success: true, workers: finalWorkers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
