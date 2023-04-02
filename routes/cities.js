const { application } = require("express");
const express = require("express");
const router = express.Router();

const CityModel = require("../models/Cities");

router.get("/getCities", async (req, res) => {
  try {
    let result = await CityModel.find({});
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});


router.post("/saveCities", (req, res) => {
  let cityName = req.body.cityName;

  let city = new CityModel({
    cityName: cityName,
  });

  try {
    city.save();

    res.send("user saved");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
