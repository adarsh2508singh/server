const express = require("express");
const router = express.Router();

const UserModel = require("../models/User");

router.get("/getUser", async (req, res) => {
    let userEmail = req.query.userEmail;
    let userPassword = req.query.userPassword;

  try {
    let result = await UserModel.find({userEmail:userEmail, userPassword:userPassword});
    console.log(result);
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;