const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true },
    company: { type: String, trim: true },
    source: {
      type: String,
      enum: ["Website", "LinkedIn", "Referral", "Ads", "Cold Email", "Other"],
      default: "Other",
    },
    stage: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Converted", "Lost"],
      default: "New",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
