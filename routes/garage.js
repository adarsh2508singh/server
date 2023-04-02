const express = require("express");
const router = express.Router();

const GarageModel = require("../models/Garage");

const CityModel = require("../models/Cities.js");
router.get("/getGarage", async (req, res) => {

    let cityName = req.query.cityName;
  try {
    let result = await GarageModel.find({garageCity: cityName});
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});


router.post("/saveGarage", async (req, res) => {
  let garageImageId = req.body.garageImageId;
  let garageName = req.body.garageName;
  let garageLocation = req.body.garageLocation;
  let garageCity = req.body.garageCity;
  let garageContact = req.body.garageContact;

  let garage = new GarageModel({
    garageImageId:garageImageId,
    garageName: garageName,
    garageLocation:garageLocation,
    garageCity:garageCity,
    garageContact:garageContact
  });

  // check whether a city exist or not
  // if exist then do not add it in cities collection
  let cityResult = await CityModel.find({cityName: garageCity});
  if(!cityResult.length){
  let city= new CityModel({
    cityName:garageCity,
  })
  await city.save();
  }




  try {
    await garage.save();

    res.send("garage saved");
  } catch (e) {
    res.send(e);
  }
});

router.get("/hello", (req,res)=>{
    res.send("hgn");
})


module.exports = router;
