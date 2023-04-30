const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
let path = require("path");
const GarageModel = require("../models/Garage");
const BookingModel = require("../models/BookAppointment");

const CityModel = require("../models/Cities.js");


// storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// let upload = multer({ storage, fileFilter });

router.get("/getGarage", async (req, res) => {
  let cityName = req.query.cityName;
  try {
    let result = await GarageModel.find({ garageCity: cityName });
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/getGarageById", async (req, res) => {
  let garageId = req.query.garageId;
  try {
    let result = await GarageModel.find({ _id: garageId });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/getUser", async (req, res) => {
  let garageEmail = req.query.email;
  let password = req.query.password;

  try {
    let result = await GarageModel.find({
      garageEmail: garageEmail,
      password: password,
    });

    if (result.length) {
      res.send(result);
    } else {
      res.send("glat");
    }
  } catch (e) {
    res.send(e);
  }
});

router.put("/saveBooking", async (req, res) => {
  let bookingId = req.body.bookingId;
  let garageid = req.body.garageid;
  let bookings = await GarageModel.find({ _id: garageid });

  console.log(bookings[0])
  let allBookings = bookings[0].booking;
  allBookings.push(bookingId);

  bookings.booking = allBookings;
  let result = await bookings[0].save();
  console.log(bookings);
  res.send(bookings);
});

router.post("/saveGarage", async (req, res) => {
  let garageImageId=req.body.garageImageId;
  let garageName = req.body.garageName;
  let garageEmail = req.body.garageEmail;
  let password = req.body.password;
  let garageLocation = req.body.garageLocation;
  let garageCity = req.body.garageCity;
  let garageContact = req.body.garageContact;
  let booking = req.body.booking;
  let homeService=req.body.homeService;

  let garage = new GarageModel({
    garageImageId:garageImageId ,
    garageName: garageName,
    garageEmail: garageEmail,
    password: password,
    garageLocation: garageLocation,
    garageCity: garageCity,
    garageContact: garageContact,
    booking: booking,
    homeService:homeService,
  });

  // check whether a city exist or not
  // if exist then do not add it in cities collection
  let cityResult = await CityModel.find({ cityName: garageCity });
  if (!cityResult.length) {
    let city = new CityModel({
      cityName: garageCity,
    });
    await city.save();
  }

  try {
    await garage.save();

    res.send("garage saved");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
