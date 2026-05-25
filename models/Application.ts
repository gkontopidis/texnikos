import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String, required: true },
  applicantMessage: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
