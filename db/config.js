const mongoose= require("mongoose");
require('dotenv').config();

const databaseUrl=process.env.DATABASE_URL;
mongoose.set("strictQuery",true);

mongoose.connect(databaseUrl,
{
 useNewUrlParser:true,
 useUnifiedTopology:true,
});

mongoose.connection.on("error",(err)=>{
    console.log("connetion failed");
});
mongoose.connection.on("connected",(connected)=>{
    console.log('connection with database');
});