import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: String,
  description: String,
  location: String,
  phone: String,
  website: String,
  contactEmail: { type: String, required: true, unique: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Index for slug lookups
CompanySchema.index({ slug: 1 });
CompanySchema.index({ contactEmail: 1 });

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
