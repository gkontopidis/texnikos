import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  reason: { type: String, required: true },
  description: String,
  reporterIP: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AbuseReport || mongoose.model("AbuseReport", ReportSchema);
