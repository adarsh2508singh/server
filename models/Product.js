const mongoose =require('mongoose');
const ProductSchema =new mongoose.Schema({
    productName:{
        type: String,
    },
    productDescription:{
        type: String,
       
    } ,
    productType:{
        type: String,
       
    },
    productPrice:{
        type: String,
    },
    productImage:{
        data: Buffer,
        contentType: String
    },
});

const Product=mongoose.model("product",ProductSchema);
module.exports=Product;