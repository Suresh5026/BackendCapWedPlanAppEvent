const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    notes: {
        type: Map,
        of: String,
      },
    status: {
      type: String,
      default: "Paid",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

const paymentModel = mongoose.model('orders',paymentSchema);
module.exports = paymentModel;