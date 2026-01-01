const mongoose =require ("mongoose");
const UserProfileSchema=new mongoose.Schema({
    age:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    
    },
    gender:{
        enum:["Male","Female","Others"],
        required:true
    },
    loaction:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("UserProfile",UserProfileSchema);