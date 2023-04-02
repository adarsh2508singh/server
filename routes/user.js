const express = require("express");
const router = express.Router();

const UserModel = require("../models/User");

router.get("/getUser", async (req, res) => {
  let userEmail = req.query.userEmail;
  let userPassword = req.query.userPassword;

try {
  let result = await UserModel.find({userEmail:userEmail, userPassword:userPassword});
  
    if(result.length) {
      res.send(result);
      
    } else {

      res.send("glat");
    }
  ;


} catch (e) {
  res.send(e);
}
});

router.post("/saveUser", async (req, res) => {
  let fullName = req.body.fullName;

  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;

  let user = new UserModel({
    fullName: fullName,

    userEmail: userEmail,
    userPassword: userPassword,
  });

  try {
    
    const userExist = await UserModel.find({ userEmail: userEmail });
    
    if (userExist.length)
    {
         return res
      .status(422)
      .json({ error: "Email  already exists" });
    }
    else{
   
      const userRegister = await user.save();
      if (userRegister)
      {
           res.status(201).json({ message: "User registered successfully" });
          }
    }
   
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
