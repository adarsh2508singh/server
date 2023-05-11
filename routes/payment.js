const Razorpay = require("razorpay");
require('dotenv').config();
const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const Payment = require('../models/PaymentModel') ;
const checkout = require("../controller/paymentController");


router.post("/checkout",checkout);
router.post("/paymentverification", async (req, res) => {
  var razorpay_order_id = req.body.razorpay_order_id;
  var razorpay_payment_id = req.body.razorpay_payment_id;
  var razorpay_signature = req.body.razorpay_signature;

  var body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    try {
      const payment = await Payment.create({
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
      });
      res.redirect(
        "https://curious-seahorse-e0cd07.netlify.app/paymentsuccess?reference=" + razorpay_payment_id
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in saving payment",
      });
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
});





module.exports = router;