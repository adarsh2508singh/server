const express = require("express");
const router = express.Router();

const BookingModel = require("../models/BookAppointment");
const GarageModel = require("../models/Garage");

router.get("/getBooking", async (req, res) => {
  let bookingId = req.query.bookingId;

  try {
    let result = await BookingModel.find({ _id: bookingId });
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});
router.get("/getBookingById", async (req, res) => {
  let bookingId = req.query.bookingId;

  try {
    let result = await BookingModel.find({ _id: bookingId });
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.post("/saveBooking", async (req, res) => {
  let fullName = req.body.fullName;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let date = req.body.date;
  let time = req.body.time;
  let problem = req.body.problem;
  let vehicleInfo = req.body.vehicleInfo;
  let bookedBy = req.body.bookedBy;

  let booking = new BookingModel({
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    date: date,
    time: time,
    problem: problem,
    vehicleInfo: vehicleInfo,
    bookedBy: bookedBy,
  });
  try {
    let result = await booking.save();

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
