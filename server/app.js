const express=require ("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");



const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




const PORT=process.env.PORT||8000

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on PORT ${PORT}`)
})