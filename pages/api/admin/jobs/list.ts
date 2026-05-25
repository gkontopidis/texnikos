import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();
    const { status, search } = req.query;

    let query: any = {};
    
    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 }).limit(50);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
