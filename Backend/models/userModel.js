import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },

    // OTP-based password reset
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 }, // timestamp in ms
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    minimize: false,
  }
);

// Avoid recompiling model if already exists (important in Next.js / hot reload)
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
