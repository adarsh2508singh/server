const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

require('dotenv').config();

const sendMail = process.env.MAIL_USER;
const sendPassword = process.env.MAIL_PASSWORD;


router.post("/sendMessage", async (req, res) => {
    const userEmail = req.body.userEmail;
    const name = req.body.name;
    const message = req.body.message;
    
    try {
      // main code of nodemailer to send OTP
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
        auth: {
          user: sendMail,
          pass: sendPassword,
        },
      });
  
    
      
  
      // initialize the object and add the otp in message
      const mailOptions = {
        from: sendMail,
        to: sendMail,
        subject: "contact message",
        html: `<div  style="text-align: center;">
        <h1> Road Side Mechanic </h1>
        <br/> 
        <p> contact message-- </p>
        <p> Name = ${name}<p>
        <p>Email = ${userEmail}<p>
        <p>Message = ${message}<p>

      </div>`,
      };
  
      await transporter.sendMail(mailOptions);
      
    } catch (e) {
      console.log(e, "sorry we can't send OTP");
    }
  });
  module.exports = router;