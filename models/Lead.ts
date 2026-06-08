import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  employerName: { type: String, required: true },
  employerEmail: { type: String, required: true },
  employerPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
