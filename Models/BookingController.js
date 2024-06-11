const express = require("express");
const router = express.Router();
const validateToken = require("../middleWares/validateToken");
const BookingModel = require("./Bookingmodel");
const eventModel = require("./eventModel");

const isDateOverlap = (fromDate1, toDate1, fromDate2, toDate2) => {
  return (
    new Date(fromDate1) <= new Date(toDate2) &&
    new Date(toDate1) >= new Date(fromDate2)
  );
};

router.post("/create-booking", validateToken, async (req, res) => {
  try {
    const { name, email, phone, eventId, fromDate, toDate, guests } = req.body;
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const conflictingBooking = await BookingModel.findOne({
      eventId: event._id,
      $or: [{ fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }],
    });

    if (conflictingBooking) {
      return res
        .status(400)
        .json({
          message: "The event is already booked for the selected dates",
        });
    }

    const newBooking = new BookingModel({
      name,
      email,
      phone,
      fromDate,
      toDate,
      guests,
      eventId: event._id,
      eventName: event.name,
      eventPrice: event.price,
      userId: req.user._id,
      status: "booked",
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-bookings", validateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await BookingModel.find({ userId: userId }).populate(
      "eventId"
    );

    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    return res.json({
      data: bookings,
      message: "Bookings fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/cancel-booking/:_id", validateToken, async (req, res) => {
  try {
    const bookingId = req.params._id;
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to cancel this booking" });
    }
    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
