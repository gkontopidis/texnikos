import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDB();
    
    // Aggregation pipeline to count leads per worker
    const stats = await Lead.aggregate([
      {
        $group: {
          _id: "$workerId",
          count: { $sum: 1 },
          leads: { $push: { employerName: "$employerName", employerEmail: "$employerEmail", employerPhone: "$employerPhone", createdAt: "$createdAt" } }
        }
      },
      { $sort: { count: -1 } },
      {
        $lookup: {
          from: "workers", // Collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "workerDetails"
        }
      },
      { $unwind: "$workerDetails" }
    ]);

    return res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
