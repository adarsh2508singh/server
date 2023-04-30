const mongoose = require("mongoose");
const express = require("express");
require("./db/config.js");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

const cityRouter = require("./routes/cities.js");
const garageRouter = require("./routes/garage.js");
const userRouter = require("./routes/user.js");
const sellerRouter = require("./routes/seller.js");
const productRouter = require("./routes/product.js");
const bookingRouter = require("./routes/booking.js");
const forgot = require("./routes/forgot.js");
const imageRouter = require("./routes/images.js");

app.use("/forgot", forgot);
app.use("/cities", cityRouter);
app.use("/garage", garageRouter);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/product", productRouter);
app.use("/booking", bookingRouter);
app.use("/image", imageRouter);

app.get("/", (req, res) => {
  res.send(`server is running at port ${PORT}`);
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
