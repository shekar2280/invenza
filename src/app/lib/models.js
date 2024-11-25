import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    cat: {
      type: String,
      enum: ["kitchen", "electronics", "groceries", "health", "household", "stationary"],
      required: true,
    },
  },
  { timestamps: true }
);

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    desc: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["sale", "refund"], 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "done", "cancelled"], 
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
      unique: true,
    },
    customer_type: {
      type: String,
      enum: ["customer","vendor"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
