const express = require("express");
const router = express.Router();
const validateToken = require("../middleWares/validateToken");
const BookingModel = require("./Bookingmodel");
const eventModel = require("./eventModel");
const userModel =require("./userModel");
const jwt = require('jsonwebtoken');


const isDateOverlap = (fromDate1, toDate1, fromDate2, toDate2) => {
  return (new Date(fromDate1) <= new Date(toDate2) && new Date(toDate1) >= new Date(fromDate2));
};

router.post("/create-booking", validateToken, async (req, res) => {
  try {
    const { name, email, phone,eventId,  fromDate, toDate, guests } = req.body;
    const event = await eventModel.findById(eventId);
   
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    const conflictingBooking = await BookingModel.findOne({
      eventId: event._id,
      $or: [
        { fromDate: { $lte: toDate }, toDate: { $gte: fromDate } }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'The event is already booked for the selected dates' });
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
      
      status: 'booked',
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/get-bookings', validateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await BookingModel.find({ userId }).populate('eventId');
    res.json({ data: bookings });
  } catch (err) {
    console.error("Get bookings error:", err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
