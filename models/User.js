const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required:true,
  },
 
  userEmail: {
    type: String,
    required:[true,"Email is Required"],
    unique:true,

  
  },
  userPassword: {
    type: String,
    required:[true,"Password is Required"],
  },
  verified:{
      type: Boolean,
      default:false,
  },
  booking:{
    type:Array,
  },
  userMobile:{
    type:String,
  },
  address:{
    type:String,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;