const mongoose=require('mongoose');

const BookingSchema = new mongoose.Schema({
    fullName:{
        type:String,
    },
    email:{
        type:String,
    },
     phoneNumber:{
        type:String,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    problem:{
        type:String,
    },
    vehicleInfo:{
        type:String,
    },
    bookedBy:{
        type:String,
    }
    
});

const Booking=mongoose.model('booking',BookingSchema);
module.exports=Booking;