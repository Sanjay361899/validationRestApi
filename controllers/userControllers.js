const User=require("../models/userModel.js")
const bcrypt=require("bcryptjs")
const {validationResult }=require("express-validator")
const register=async (req,res)=>{
try {
    const errordata=validationResult(req)
    if(!errordata)
    {const checkUser=await  User.find({email:req.body.email});
    if(checkUser){
        res.status(200).send({success:false,message:""})
    }else{
        const hash=await bcrypt.hash(req.body.password,10);
          const data= new User({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            image:req.body.image
           })
        data.save()
        res.status(200).send({success:true,data:data});
    }}else{
    res.status(400).send({success:false,error:errordata.array()})

    }
} catch (error) {
    res.status(400).send({success:false,error:error.message})
}
}
module.exports={
    register
}