const express = require("express");
const router = express.Router();

const BookingModel=require('../models/BookAppointment');
const GarageModel=require('../models/Garage');


router.post("/saveBooking",(req,res)=>{
    let fullName=req.body.fullName;
    let email=req.body.email;
    let phoneNumber=req.body.phoneNumber;
    let date=req.body.date;
    let time=req.body.time;
    let problem=req.body.problem;
    let vehicleInfo=req.body.vehicleInfo;

let booking =new BookingModel({
    fullName:fullName,
    email:email,
    phoneNumber:phoneNumber,
    date:date,
    time:time,
    problem:problem,
    vehicleInfo:vehicleInfo,
});
try {
    booking.save();

    res.send("booking save!");
  } catch (e) {
    res.send(e);
  } 


});
module.exports = router;