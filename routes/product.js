const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const ProductModel = require("../models/Product.js");


// storage



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
        fieldName: file.fieldname
      });
    },
    key: function (req, file, cb) {
      console.log(file);
      cb(null, `product-${Date.now()}.jpeg`);
    },
  }),
});










router.get("/getProduct", async (req, res) => {
  try {
    let result = await ProductModel.find({});
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});



router.post("/saveProduct",upload.single('ProductImage'), async (req, res) => {
  let productName = req.body.productName;
  let productDescription = req.body.productDescription;
  let productType = req.body.productType;
  let productPrice = req.body.productPrice;

  let product = new ProductModel({
    productImage:req.file.location,
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
