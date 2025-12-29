const express=require ("express");
const connectDB = require("./config/database");
const app=express();
require("dotenv").config();



const PORT=process.env.PORT||8000

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on PORT ${PORT}`)
})