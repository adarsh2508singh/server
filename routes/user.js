const express = require("express");
const router = express.Router();

const UserModel = require("../models/User");

router.get("/getUser", async (req, res) => {
  let userEmail = req.query.email;
  let userPassword = req.query.password;

  try {
    let result = await UserModel.find({
      userEmail: userEmail,
      userPassword: userPassword,
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

router.get("/forgotUser", async (req, res) => {
  let userEmail = req.query.email;

  try {
    let result = await UserModel.find({
      userEmail: userEmail,
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
  let userId = req.body.userId;
  let bookings = await UserModel.find({ _id: userId });

  console.log(bookings[0]);
  let allBookings = bookings[0].booking;
  allBookings.push(bookingId);

  bookings.booking = allBookings;
  let result = await bookings[0].save();
  console.log(bookings);
  res.send(bookings);
});

router.get("/getUserById", async (req, res) => {
  let userId = req.query.userId;
  try {
    let result = await UserModel.find({ _id: userId });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

router.post("/saveUser", async (req, res) => {
  let fullName = req.body.fullName;

  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;

  let user = new UserModel({
    fullName: fullName,

    userEmail: userEmail,
    userPassword: userPassword,
  });

  try {
    const userExist = await UserModel.find({ userEmail: userEmail });

    if (userExist.length) {
      // return res.status(422).json({ error: "Email is  already exists" });
      res.send("exists");
    } else {
      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
