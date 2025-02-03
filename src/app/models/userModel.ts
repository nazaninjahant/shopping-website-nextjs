import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    deliveryAddresses: {
      type: Array,
      required: false,
      defaultL: [],
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// if the model is already defined , use the model else create a new one
export default mongoose.models["users"] || mongoose.model("users", userSchema);
