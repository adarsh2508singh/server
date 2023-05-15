const mongoose =require('mongoose');
const GarageSchema =new mongoose.Schema({
    garageImageId:{
        type:String,
    },
    garageName:{
        type: String,
    },
    garageEmail:{
        type: String,
    },
    password:{
        type: String,
    },
    garageLocation:{
        type: String,
       
    } ,
    garageCity:{
        type: String,
       
    },
    latitude: {
        type: Number,
       
      },
      longitude: {
        type: Number,
       
      },



    garageContact:{
        type: String,
    },
    booking:{
        type:Array,
    },
    homeService:{
        type:Boolean,
    },
    vehicleType:{
        type: String,
    },
    paymentVerify:{
        type:Boolean,
        default:false,
    }

    
});

const Garage=mongoose.model("garage",GarageSchema);
module.exports=Garage;