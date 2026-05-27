import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";
import Company from "@/models/Company";
import { generateSlug } from "@/lib/slug";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simple protection
  const { secret } = req.query;
  if (secret !== "migrate123") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await connectDB();

    const jobs = await Job.find({ companyId: { $exists: false } });
    let count = 0;

    for (const job of jobs) {
      if (!job.company || !job.contactEmail) continue;

      let company = await Company.findOne({ contactEmail: job.contactEmail });

      if (!company) {
        let slug = generateSlug(job.company);
        let slugExists = await Company.findOne({ slug });
        if (slugExists) {
          slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
        }

        company = new Company({
          name: job.company,
          slug,
          contactEmail: job.contactEmail,
          location: job.location,
          phone: job.contactPhone,
          verified: job.emailVerified || false,
        });
        await company.save();
      }

      job.companyId = company._id;
      await job.save();
      count++;
    }

    return res.status(200).json({ message: `Migrated ${count} jobs.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
