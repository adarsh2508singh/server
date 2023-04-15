const mongoose =require('mongoose');
const GarageSchema =new mongoose.Schema({
    garageImageId:{
        data: Buffer,
        contentType: String
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
    garageContact:{
        type: String,
    },
    booking:{
        type:Array,
    }

    
});

const Garage=mongoose.model("garage",GarageSchema);
module.exports=Garage;