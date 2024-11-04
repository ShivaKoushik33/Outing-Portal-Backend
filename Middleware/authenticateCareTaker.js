const jwt=require("jsonwebtoken");
const CareTaker=require("../Models/CareTaker");
const Student=require("../Models/Student");
const dotEnv=require("dotenv");
const { updateSearchIndex } = require("../Models/Outing");


dotEnv.config();
const secretKey=process.env.WhatIsYourName;

const Authenticate=async(req,res,next)=>{
    // console.log("middile");
    const token=req.headers.token;
    
    if(!token){
        return res.status(401).json({error:"Token is required"});  
    }
    try{
        const decoded=jwt.verify(token,secretKey);
        
        const user=await CareTaker.findById(decoded.careTakerId) || await Student.findById(decoded.studentId);
        
        if (!user) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        req.user=user;
        // console.log(user);
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}
module.exports=Authenticate;