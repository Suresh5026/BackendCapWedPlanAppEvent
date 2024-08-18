const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require("./paymentModel");
const BookingModel = require("./Bookingmodel");

let instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.post("/orders", async (req, res) => {
  try {
    const { userId, amount, bookingId } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      notes: {
        userId: userId,
        bookingId: bookingId,
      },
    };

    instance.orders.create(options, async (err, order) => {
      if (err) {
        return res.status(500).json({ message: "Server Error", error: err });
      }
      const newOrder = new paymentModel({
        orderId: order.id,
        userId : userId,
        bookingId:bookingId,
        amount: order.amount,
        currency: order.currency,
        notes: order.notes,
      });
      await newOrder.save();
      return res.status(200).json({
        data: order,
        message: "Order Created Successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/verify", async (req, res) => {
    console.log(req.body);
    
  const body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;
  const bookingId = req.body.bookingId;
  console.log(bookingId);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.response.razorpay_signature) {
    console.log(bookingId);
    try {
      await BookingModel.updateOne(
        { _id: req.body.bookingId },
        { $set: { paymentStatus: "Paid" } }
      );
      if (result.nModified > 0) {
        console.log("Payment updated Successfully");
        res.json({ success: true, message: "Payment Verification success" });
      } else {
        console.log("No matching document found or status already updated.");
        res.json({
          success: false,
          message: "No matching document found or status already updated.",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Database update failed" });
    }
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
});

module.exports = router;
