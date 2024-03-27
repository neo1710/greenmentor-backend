const mongoose=require("mongoose");
require("dotenv").config();

let db=mongoose.connect(`${process.env.URL}todo`);

module.exports=db;