const { default: mongoose } = require("mongoose")

const connectDB=async (req,res)=>{
    try {

        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connection successfull")
        })

        
    } catch (error) {
        console.log("error in connecting to MongoDB",error)
    }
}
module.exports=connectDB;