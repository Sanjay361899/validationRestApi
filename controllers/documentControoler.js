const {validationResult }=require("express-validator")
const Documents =require("../models/docModel.js")
const docs=async (req,res)=>{
try {
const error=validationResult(req);
    if(!error.isEmpty()){
        res.status(400).send({success:false,error:error.array()})
    }
    const checkUser=await  Documents.find({email:req.body.email});
  
    if(checkUser.length){
        res.status(200).send({success:false,message:""})
    }else{
          const data=await new Documents({
            document:req.file.path
           })
       await data.save()
        res.status(200).send({success:true,data:data});
    }
   
} catch (error) {
    res.status(400).send({success:false,error:error.message})
}
}
module.exports={
    docs
}