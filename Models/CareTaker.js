const mongoose = require("mongoose");
const CareTakerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
    }
});
const CareTaker=mongoose.model("CareTaker",CareTakerSchema);
module.exports=CareTaker;