module.exports.createUserProfile = async(req,res)=>{
    try {
        const {age,contact,gender,location}=req.body;
        if(!age||!contact||!gender||!location){
            return res.status(404).json({message:"All fields are required"})
        }
        
    } catch (error) {
        
    }
}