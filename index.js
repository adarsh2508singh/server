const mongoose= require("mongoose");
const express= require("express");
require("./db/config.js");
const cors = require("cors");
const PORT=8000;


const app=express();
app.use(express.json());
app.use(cors());
 

const cityRouter = require("./routes/cities.js");
const garageRouter= require("./routes/garage.js");
const userRouter= require("./routes/user.js");

app.use("/cities",cityRouter);
app.use("/garage",garageRouter);
app.use('/user',userRouter);

app.get("/",(req,res) =>{
    res.send(`server is running at port ${PORT}`)
})

app.listen(PORT ,()=> console.log(`server is running on port ${PORT}`));
