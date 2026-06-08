import mongoose from "mongoose";
import crypto from "crypto";

const WorkerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  experienceYears: { type: Number },
  bio: { type: String },
  skills: [String],
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "active", "hidden", "rejected"],
    default: "pending" 
  },
  manageToken: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID(),
  },
  emailVerified: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  unlockedBy: [{ type: String }], // Store identifiers of employers who unlocked this profile
  createdAt: { type: Date, default: Date.now },
});

WorkerSchema.index({ specialty: 1 });
WorkerSchema.index({ location: 1 });
WorkerSchema.index({ status: 1 });

export default mongoose.models.Worker || mongoose.model("Worker", WorkerSchema);
