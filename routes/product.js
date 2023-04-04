const express = require("express");
const router = express.Router();

const ProductModel = require("../models/Product.js");


router.get("/getProduct", async (req, res) => {
  try {
    let result = await ProductModel.find({});
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});



router.post("/saveProduct", async (req, res) => {
  let productName = req.body.productName;
  let productDescription = req.body.productDescription;
  let productType = req.body.productType;
  let productPrice = req.body.productPrice;

  let product = new ProductModel({
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
