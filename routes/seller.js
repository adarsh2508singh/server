const express = require("express");
const router = express.Router();

const SellerModel = require("../models/Seller.js");


// router.get("/getGarage", async (req, res) => {

//     let cityName = req.query.cityName;
//   try {
//     let result = await GarageModel.find({garageCity: cityName});
//     console.log(result);
//     res.send(result);
//   } catch (e) {
//     res.send(e);
//   }
// });


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
    shopName:shopName,
    sellerPassword: sellerPassword,

    shopLocation:shopLocation,
   
    sellerPhone:sellerPhone
  });






try {
    
    const sellerExist = await SellerModel.find({ sellerEmail: sellerEmail });
    
    if (sellerExist.length)
    {
         return res
      .status(422)
      .json({ error: "Email is  already exists" });
    }
    else{
   
      const sellerRegister = await seller.save();
      if (sellerRegister)
      {
           res.status(201).json({ message: "seller registered successfully" });
          }
    }
   
  } catch (e) {
    res.send(e);
  }
});




module.exports = router;
