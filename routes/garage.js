const express = require("express");
const router = express.Router();
const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
let path = require("path");
const GarageModel = require("../models/Garage");
const BookingModel = require("../models/BookAppointment");
//  const imageUpload= require("../controller/imageUpload")
const CityModel = require("../models/Cities.js");

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRECT_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});
const s3 = new aws.S3();
const bucketName = process.env.AWS_BUCKET_NAME;

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,

    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
      });
    },
    key: function (req, file, cb) {
      console.log(file);
      cb(null, `image-${Date.now()}.jpeg`);
    },
  }),
});

// storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },cb
//   filename: function (req, file, ) {
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
    let result = await GarageModel.find({
      garageCity: cityName,
      paymentVerify: true,
    });
    // let payment = await GarageModel.find({ paymentVerify: true });
    console.log(result);

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/getGarageByLoc", async (req, res) => {
  try {
    let result = await GarageModel.find({});

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.get("/forgotUser", async (req, res) => {
  let userEmail = req.query.email;

  try {
    let result = await GarageModel.find({
      garageEmail: userEmail,
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

  console.log(bookings[0]);
  let allBookings = bookings[0].booking;
  allBookings.push(bookingId);

  bookings.booking = allBookings;
  let result = await bookings[0].save();
  console.log(bookings);
  res.send(bookings);
});

router.put("/updatepayment", async (req, res) => {
  const garageEmail = req.body.garageEmail;
  //find the user to update the payment

  let result = await GarageModel.find({ garageEmail: garageEmail });

  result[0].paymentVerify = true;

  await result[0].save();
  res.send("OK");
});

router.post("/saveGarage", upload.single("mypic"), async (req, res) => {
  let garageName = req.body.garageName;
  let garageEmail = req.body.garageEmail;
  let password = req.body.password;
  let garageLocation = req.body.garageLocation;
  let garageCity = req.body.garageCity;
  let garageContact = req.body.garageContact;
  let booking = req.body.booking;
  let homeService = req.body.homeService;
  let towService = req.body.towService;
  let vehicleType = req.body.vehicleType;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  let garage = new GarageModel({
    garageImageId: req.file.location,
    garageName: garageName,
    garageEmail: garageEmail,
    password: password,
    garageLocation: garageLocation,
    garageCity: garageCity,
    garageContact: garageContact,
    booking: booking,
    homeService: homeService,
    towService: towService,
    vehicleType: vehicleType,
    latitude: latitude,
    longitude: longitude,
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
