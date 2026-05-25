import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    return res.status(200).json({
      success: true,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MONGO ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}