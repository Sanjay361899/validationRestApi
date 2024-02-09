const express=require('express');
const user_router=express();
const path=require('path');
const multer=require('multer');
const userController=require("../controllers/userControllers.js")
user_router.use(express.json())
user_router.use(express.urlencoded({extended:true}))
user_router.use(express.static('public'))
const userValidation=require('../helper/userValidator.js')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,path.join(__dirname,'../public/images'),(error,success)=>{
        if(error) throw error;
       })
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname,(error,success)=>{
            if(error) throw error;
        });
    }
})
const upload=multer({storage:storage});
user_router.post('/register',upload.single("image"),userValidation.register,userController.register)

module.exports=user_router;