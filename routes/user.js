const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require('dotenv').config();
const UserModel = require("../models/User");
const {
	signUpBodyValidation,
	logInBodyValidation,
} = require("../utils/validationSchema.js");
const generateTokens = require("../utils/generateTokens.js");



// signup
router.post("/signUp", async (req, res) => {
	try {
		const { error } = signUpBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const user = await UserModel.findOne({ userEmail: req.body.userEmail });
		if (user)
			return res
				.status(400)
				.json({ error: true, message: "User with given email already exist" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.userPassword, salt);

		await new UserModel({ ...req.body,userPassword: hashPassword }).save();

		res
			.status(201)
			.json({ error: false, message: "Account created sucessfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});





// login
router.post("/logIn", async (req, res) => {
	try {
		const { error } = logInBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({ error: true, message: error.details[0].message });

		const user = await UserModel.findOne({ userEmail: req.body.userEmail });
		if (!user)
			return res
				.status(401)
				.json({ error: true, message: "Invalid email or password" });

		const verifiedPassword = await bcrypt.compare(
			req.body.userPassword,
			user.userPassword
		);
		if (!verifiedPassword)
			return res
				.status(401)
				.json({ error: true, message: "Invalid email or password" });

		const { accessToken, refreshToken } = await generateTokens(user);

		res.status(200).json({
			error: false,
			accessToken,
			refreshToken,
    
			message: "Logged in sucessfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});















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

router.put("/updateUser", async (req, res) => {
  try {
    let userId = req.body.userId;
    const updateName = req.body.userFullname;
    const updateEmail = req.body.userEmail;
    let userInfo = await UserModel.find({ _id: userId });
    userInfo[0].fullName = updateName;
    userInfo[0].userEmail = updateEmail;

    await userInfo[0].save();
    res.send("OK");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateMobile", async (req, res) => {
  try {
    let userId = req.body.userId;
  
    const updateMobile = req.body.userMobile;
    let userInfo = await UserModel.find({ _id: userId });
    
    userInfo[0].userMobile = updateMobile;

    await userInfo[0].save();
    res.send("OK");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


router.put("/saveBooking", async (req, res) => {
  let bookingId = req.body.bookingId;
  let userId = req.body.userId;
  let bookings = await UserModel.find({ _id: userId });

  console.log(bookings[0]);
  let allBookings = bookings[0].booking;
  allBookings.unshift(bookingId);

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
