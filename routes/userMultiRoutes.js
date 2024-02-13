const express=require('express');
const userMulti_router=express();
const path=require('path');
const multer=require('multer');
const userController=require("../controllers/userControllers.js")
userMulti_router.use(express.json())
userMulti_router.use(express.urlencoded({extended:true}))
userMulti_router.use(express.static('public'))
const userValidation=require('../helper/userValidator.js')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,(file.mimetype=="image/jpeg"||file.mimetype=="image/png"||file.mimetype=="image/jpg")?path.join(__dirname,'../public/image'):path.join(__dirname,'../public/document'),(error,success)=>{
        if(error) throw error;
       })
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname,(error,success)=>{
            if(error) throw error;
        });
    }
})
const fileFilter=(req,file,cb)=>{

   if(file.fieldname=="image"){(file.mimetype=="image/jpeg"||file.mimetype=="image/png"||file.mimetype=="image/jpg")?  cb(null,true): cb(null,false)
}else if(file.fieldname=="document"){
(file.mimetype=="application/vnd.ms-excel"||file.mimetype=="application/pdf"||file.mimetype=="application/msword"||file.mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")?  cb(null,true): cb(null,false)
}
}
const upload=multer({storage:storage,fileFilter:fileFilter}).fields([{name:"image",maxCount:2},{name:"document",maxCount:1}]);
userMulti_router.post('/registerMulti',upload,userValidation.registermulti,userController.registermulti)

module.exports=userMulti_router;