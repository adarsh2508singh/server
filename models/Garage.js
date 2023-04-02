const mongoose =require('mongoose');
const GarageSchema =new mongoose.Schema({
    garageImageId:{
        type: String,
    },
    garageName:{
        type: String,
    },
    garageLocation:{
        type: String,
       
    } ,
    garageCity:{
        type: String,
       
    },
    garageContact:{
        type: String,
    }
});

const Garage=mongoose.model("garage",GarageSchema);
module.exports=Garage;