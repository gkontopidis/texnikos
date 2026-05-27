import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";
import Job from "@/models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDB();

    const company = await Company.findOne({ slug });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const activeJobs = await Job.find({ 
      companyId: company._id,
      status: "active" 
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      company,
      jobs: activeJobs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
