const {check}=require("express-validator");
exports.register=[
    check("name","Name is required").not().isEmpty(),
    check("email","Email need to be valid required").isEmail().normalizeEmail(),
]