const mongoose=require("mongoose");
const docSchema=mongoose.Schema({
document:{
    type:String,
    required:true
}
})
module.exports=mongoose.model("Document",docSchema);