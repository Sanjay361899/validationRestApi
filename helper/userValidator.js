const {check}=require("express-validator");
exports.register=[
    check("name","Name is required").not().isEmpty(),
    check("email","Email need to be valid required").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check("password","Password must be atleast 6 character long and have minimun 1 uppercase and 1 lowecase 1 number").isStrongPassword({
        minLength:6,
        minNumbers:1,
        minLowercase:1,
        minUppercase:1
    }),
    check("image").custom((value,{req})=>{
        if(req.file.mimetype=="image/jpeg" || req.file.mimetype=="image/png" ||req.file.mimetype=="image/jpg"){
            return true;
        }
        else{return false;}
    }).withMessage("please upload an image which is jpeg,jpg and png.")
]
exports.document=[
    check("document").custom((value,{req})=>{
        if(req.file.mimetype=="application/vnd.ms-excel"||req.file.mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            return true;
        }else{
            return false;
        }
    }).withMessage("please upload an application which is xlsx and ms excel format.")
]

exports.registermulti=[
    check("name","Name is required").not().isEmpty(),
    check("email","Email need to be valid required").isEmail().normalizeEmail({gmail_remove_dots:true}),
    check("password","Password must be atleast 6 character long and have minimun 1 uppercase and 1 lowecase 1 number").isStrongPassword({
        minLength:6,
        minNumbers:1,
        minLowercase:1,
        minUppercase:1
    }),
    check("image").custom((value,{req})=>{
        if(req.files.image[0].mimetype=="image/jpeg" || req.files.image[0].mimetype=="image/png" ||req.files.image[0].mimetype=="image/jpg"){
            return true;
        }
        else{return false;}
    }).withMessage("please upload an image which is jpeg,jpg and png."),
    check("document").custom((value,{req})=>{
        if(req.files.document[0].mimetype=="application/vnd.ms-excel"||req.files.document[0].mimetype=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||req.files.document[0].mimetype=="application/pdf"||req.files.document[0].mimetype=="application/msword"){
            return true;
        }else{
            return false;
        }
    }).withMessage("please upload an application which is xlsx and ms excel format.")
]