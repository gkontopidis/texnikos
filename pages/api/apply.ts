import type { NextApiRequest, NextApiResponse } from "next";

type SuccessResponse = { message: string };
type ErrorResponse = { error: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    jobId,
    jobTitle,
    employerEmail,
    employerPhone,
    applicantName,
    applicantEmail,
    applicantPhone,
    applicantMessage,
  } = req.body ?? {};

  if (!jobId || !applicantName || !applicantEmail || !applicantPhone) {
    return res.status(400).json({ error: "Missing required application fields." });
  }

  console.log("New job application received:", {
    jobId,
    jobTitle,
    employerEmail,
    employerPhone,
    applicantName,
    applicantEmail,
    applicantPhone,
    applicantMessage,
  });

  // TODO: Εδώ μπορείς να προσθέσεις πραγματική αποστολή email / notification στον εργοδότη.
  return res.status(200).json({ message: "Application received and employer notified." });
}
