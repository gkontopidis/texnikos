import mongoose from "mongoose";
import crypto from "crypto";

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  salaryMin: Number,
  salaryMax: Number,
  salaryText: String,
  description: String,
  category: String,
  urgent: Boolean,
  fullTime: Boolean,
  featured: Boolean,
  contactPhone: String,
  contactEmail: String,
  status: { 
    type: String, 
    enum: ["pending", "active", "closed", "expired", "rejected", "scheduled"],
    default: "pending" 
  },
  plan: { type: String, enum: ["free", "featured", "urgent"], default: "free" },
  isPaid: { type: Boolean, default: false },
  moderationNotes: String,
  publishAt: { type: Date, default: Date.now },
  featuredUntil: Date,
  expiresAt: Date,
  manageToken: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID(),
  },
  applicantCount: { type: Number, default: 0 },
  expirationNotified: { type: Boolean, default: false },
  verifiedEmployer: { type: Boolean, default: false },
  salaryVerified: { type: Boolean, default: false },
  responseRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

JobSchema.index({ status: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ title: "text", description: "text" });
JobSchema.index({ publishAt: -1 });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);