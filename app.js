const express=require('express')
const mongoose=require('mongoose');
const app=express();
const user_router=require("./routes/userRoutes.js");
const port=6666;
mongoose.connect("mongodb://127.0.0.1:27017/validationAll")
app.use('/',user_router);
const document_router=require("./routes/documentRoutes.js")
app.use('/',document_router);
const userMulti_router=require("./routes/userMultiRoutes.js")
app.use('/',userMulti_router);

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})