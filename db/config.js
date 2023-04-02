const mongoose= require("mongoose");
mongoose.set("strictQuery",true);

mongoose.connect("mongodb+srv://recbmern:Adarsh%4025@cluster0.vg5lnf1.mongodb.net/car?retryWrites=true&w=majority",
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