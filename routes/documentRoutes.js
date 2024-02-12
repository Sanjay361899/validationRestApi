const express=require("express");
const document_routes=express();
document_routes.use(express.json());
document_routes.use(express.urlencoded({extended:true}));
document_routes.use(express.static("public"))
const multer=require("multer");
const path=require("path");
const docController=require("../controllers/documentControoler.js")
const docValidation=require("../helper/userValidator.js")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/document'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    (file.mimetype=="application/vnd.ms-excel"||file.mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")?cb(null,true):cb(null,false);
}
const upload=multer({storage,fileFilter});
document_routes.post('/doc',upload.single('document'),docValidation.document,docController.docs);
module.exports=document_routes;