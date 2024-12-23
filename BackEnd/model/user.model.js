import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // id: {
    //   type: "string",
    //   required: true,
    // },
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      unique: true,
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    confirmPassword: {
      type: "string",
      required: true,
    },
    role: {
      type: String,
      enum: ["admin","buyer", "seller","moderator", "banned"],
      default: "buyer",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned:{
        type: Boolean,
        default: false,
    },
    isAgreeToTerms:{
      type: Boolean,
     
    },
    originalRole: { type: String},
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timeseries: true }
);

export const User = mongoose.model("User", userSchema);
