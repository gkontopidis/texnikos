import mongoose from "mongoose";
import crypto from "crypto";

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  duration: {
    type: { type: String }, 
    amount: Number, 
    unit: String, 
  },
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
    enum: ["active", "closed", "expired", "rejected", "scheduled", "pending-verification"],
    default: "pending-verification" 
  },
  audit: {
    creatorIP: String,
    userAgent: String,
    createdAt: { type: Date, default: Date.now },
  },
  plan: { type: String, enum: ["free", "featured", "urgent"], default: "free" },
  isPaid: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
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
  responseRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  });
JobSchema.index({ status: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ title: "text", description: "text" });
JobSchema.index({ publishAt: -1 });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);