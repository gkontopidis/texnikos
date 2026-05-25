import mongoose from "mongoose";

const AlertSubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

AlertSubscriptionSchema.index({ email: 1, specialty: 1, location: 1 }, { unique: true });

export default mongoose.models.AlertSubscription || mongoose.model("AlertSubscription", AlertSubscriptionSchema);