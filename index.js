const mongoose = require("mongoose");
const express = require("express");
require("./db/config.js");
require('dotenv').config();

const cors = require("cors");
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors());

const cityRouter = require("./routes/cities.js");
const garageRouter = require("./routes/garage.js");
const userRouter = require("./routes/user.js");
const sellerRouter = require("./routes/seller.js");
const productRouter = require("./routes/product.js");
const bookingRouter = require("./routes/booking.js");
const forgot = require("./routes/forgot.js");
const imageRouter = require("./routes/images.js");
const paymentRouter=require("./routes/payment.js");

app.use("/payment",paymentRouter);
app.use("/forgot", forgot);
app.use("/cities", cityRouter);
app.use("/garage", garageRouter);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/product", productRouter);
app.use("/booking", bookingRouter);
app.use("/image", imageRouter);


app.get("/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.get("/", (req, res) => {
  res.send(`server is running at port ${PORT}`);
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
