const User=require("../models/userModel.js")
const bcrypt=require("bcryptjs")
const nodeMailer=require("nodemailer")
const {validationResult }=require("express-validator")
const usermultiModel = require("../models/usermultiModel.js")

const sendMailer=(email,attachmentpath,attachmentname)=>{
    try {
        console.log("hi");
        const transporter=nodeMailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.SMTP_HOST,
                pass:process.env.SMTP_PASSWORD
            }
        });
        const mailOptions={
            from:process.env.SMTP_HOST,
            to:email,
            subject:"For test mail with the options.",
            html:`<p>here is something</p>`,
            attachments: [
                {
                  filename: attachmentname,
                  path: attachmentpath
                }
              ]
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return false
            } else {
              console.log('Email sent: ' + info.response);
              return true;
            }
          });
        
    } catch (error) {
        
    }
}
const register=async (req,res)=>{
try {
    const errordata=validationResult(req)
    if(errordata.isEmpty())
    {const checkUser=await  User.find({email:req.body.email});
    console.log(checkUser,"user");
    if(checkUser.length){
        res.status(200).send({success:false,message:""})
    }else{
        const hash=await bcrypt.hash(req.body.password,10);
        console.log(req.file.path,"req.file.path");
        console.log(req.file.filename,"req.file.filename");
          const data=await new User({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            image:req.file.path
           })
       await data.save()
        res.status(200).send({success:true,data:data});
    }}else{
    res.status(400).send({success:false,error:errordata.array()})

    }
} catch (error) {
    res.status(400).send({success:false,error:error.message})
}
}
const registermulti=async (req,res)=>{
    try {
        const errordata=validationResult(req)
        if(errordata.isEmpty())
        {const checkUser=await  usermultiModel.find({email:req.body.email});
        console.log(checkUser,"user");
        if(checkUser.length){
            res.status(200).send({success:false,message:""})
        }else{
            const hash=await bcrypt.hash(req.body.password,10);
              const data=await new usermultiModel({
                name:req.body.name,
                email:req.body.email,
                password:hash,
                image:req.files.image[0].path,
                document:req.files.document[0].path
               })
           await data.save()
            res.status(200).send({success:true,data:data});
        }}else{
        res.status(400).send({success:false,error:errordata.array()})
    
        }
    } catch (error) {
        res.status(400).send({success:false,error:error.message})
    }
    }
    const sendMail=async(req,res)=>{
     try {
    console.log(req.body.email,"filename");
    //    const send=  sendMailer(req.body,req.file.path,req.file.originalname)
       console.log("send");
    //    if(send){
    //     res.status(200).status({message:"mail is successfully sent"})
    //    }else{
    //     res.status(200).status({message:"mail is not sended"})
    //    }
    } catch (error) {
    res.status(400).send({success:false,message:error.message})
   }
    }
module.exports={
    register,
    registermulti,
    sendMail
}