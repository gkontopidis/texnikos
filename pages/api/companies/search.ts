import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Company from "@/models/Company";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Company name is required" });
  }

  try {
    await connectDB();

    // Use a case-insensitive regex for prefix matching
    const companies = await Company.find({ 
      name: { $regex: new RegExp(`^${name}`, 'i') } 
    }).limit(5).select('name location phone contactEmail');

    return res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
