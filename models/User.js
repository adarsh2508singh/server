const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    
  },
 
  userEmail: {
    type: String,
  
  },
  userPassword: {
    type: String,
  
  },
  verified:{
      type: Boolean,
      default:false,
  },
  booking:{
    type:Array,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;