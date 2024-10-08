const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    guests: {
      type: String,
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'events',
      required: true,
    },
    userId: {
      type :mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,

    },
    eventName: {
      type: String,
      required: true,
    },
    eventPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['booked', 'cancelled'],
      default: 'booked',
    },
    paymentStatus : {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
      required :  true
    }
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("bookings", bookingSchema);
module.exports = BookingModel;
