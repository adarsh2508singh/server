// const aws= require("aws-sdk");
// const multer=require("multer");
// const multerS3= require("multer-s3");
// require('dotenv').config();
// const GarageModel = require("../models/Garage");


// const s3= new aws.S3({
// accessKeyId:process.env.S3_ACCESS_KEY,
// secretAccessKey:process.env.S3_ACCESS_KEY,
// region:process.env.S3_BUCKET_REGION,
// });




// const upload=(bucketName)=> multer({
//     storage:multerS3({
//         s3,
//         bucket:bucketName,
//         metadata: function(req,file,cb){
//             cb(null,{fieldName:file.fildname});
//         },
//         key: function(req,file,cb){
//             cb(null,`image-${Date.now()}.jpeg`);
//         },

//     }),
// });

// exports.uploadImage=(req,res,next)=>{

// const uploadSingle = upload("roadside-bucket").single('image-upload');

// uploadSingle(req,res, async (err)=>{
//     if(err)
//      return res.status(400).json({success:false,message:err.message});


//  await GarageModel.save({  garageImageId: req.file.location });
// //    console.log(req.file);  

//    res.status(200).json({data: req.files.location });
// })

// };

