const mongoose =require('mongoose');
const CitySchema =new mongoose.Schema({
    cityName:{
        type: String,
        required:true,
    }
});

const City=mongoose.model("cities",CitySchema);
module.exports=City;