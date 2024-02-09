const User=require("../models/userModel.js")
const register=(req,res)=>{
try {
    const checkUser= User.find({email:req.body.email});
    if(checkUser){
        res.status(200).send({success:false,message:""})
    }else{
           
    }
} catch (error) {
    res.status(400).send({success:false,error:error.message})
}
}
module.exports={
    register
}