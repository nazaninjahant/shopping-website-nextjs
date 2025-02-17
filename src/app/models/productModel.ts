import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    countInStock: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    features: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models["products"] ||
  mongoose.model("products", productSchema);
