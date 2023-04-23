const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const ProductModel = require("../models/Product.js");


// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "productImages");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });












router.get("/getProduct", async (req, res) => {
  try {
    let result = await ProductModel.find({});
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});



router.post("/saveProduct",upload.single('testImage'), async (req, res) => {
  let productName = req.body.productName;
  let productDescription = req.body.productDescription;
  let productType = req.body.productType;
  let productPrice = req.body.productPrice;

  let product = new ProductModel({
    productImage:{
      data: fs.readFileSync("productImages/" + req.file.filename),
      contentType: "image/png",
    } ,
    productName: productName,
    productDescription: productDescription,
    productType: productType,
    productPrice: productPrice,
  });
  try {
    await product.save();
    res.send("product saved");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
