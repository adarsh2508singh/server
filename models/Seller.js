const mongoose =require('mongoose');
const SellerSchema =new mongoose.Schema({
 
    sellerName:{
        type: String,
    },
    shopName:{
        type: String,
    },
    shopLocation:{
        type: String,
       
    } ,
    
    sellerContact:{
        type: String,
    }
});

const Seller=mongoose.model("seller",SellerSchema);
module.exports=Garage;