const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Excel"], // ✅ ADD Excel
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
