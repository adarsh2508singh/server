const express = require("express");
const router = express.Router();

const SellerModel = require("../models/Seller.js");

router.get("/getUser", async (req, res) => {
  let sellerEmail = req.query.email;
  let sellerPassword = req.query.password;

  try {
    let result = await SellerModel.find({
      sellerEmail: sellerEmail,
      sellerPassword: sellerPassword,
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
    let result = await SellerModel.find({
      sellerEmail: userEmail,
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





router.post("/saveSeller", async (req, res) => {
  let sellerName = req.body.sellerName;
  let shopName = req.body.shopName;
  let sellerEmail = req.body.sellerEmail;
  let sellerPassword = req.body.sellerPassword;

  let shopLocation = req.body.shopLocation;

  let sellerPhone = req.body.sellerPhone;

  let seller = new SellerModel({
    sellerName: sellerName,
    sellerEmail: sellerEmail,
    shopName: shopName,
    sellerPassword: sellerPassword,

    shopLocation: shopLocation,

    sellerPhone: sellerPhone,
  });

  try {
    const sellerExist = await SellerModel.find({ sellerEmail: sellerEmail });

    if (sellerExist.length) {
      return res.status(422).json({ error: "Email is  already exists" });
    } else {
      const sellerRegister = await seller.save();
      if (sellerRegister) {
        res.status(201).json({ message: "seller registered successfully" });
      }
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
