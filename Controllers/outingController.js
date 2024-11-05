const Outing=require("../Models/Outing");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotEnv=require("dotenv");

dotEnv.config();

const createOuting=async(req,res)=>{
  const{name,studentId,year,reason,outingDate,slot}=req.body;
  const user = req.user; // This contains the authenticated user's info (whether a student or caretaker)
  console.log(user.name);
  // const{name,studentId,year,reason,outingDate,slot}=req.body; 
  const normalizedDate = new Date(outingDate);
  normalizedDate.setHours(0, 0, 0, 0); 
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);
  if (normalizedDate < today || normalizedDate > oneWeekLater) {
    return res.status(400).json({
      success: false,
      message: "Outing date must be within one week from today."
    });
  }
    try{
      const existingOuting=await Outing.findOne({studentId:studentId,
        outingDate: {
          $gte: normalizedDate,
          $lt: new Date(normalizedDate.getTime() + 24 * 60 * 60 * 1000) // Next day at midnight
      },
      });
      if(existingOuting){
        return res.status(409).json({success:false,message:"Outing is already booked by student on this date"});
      }
    
        const newOuting=new Outing({
          name,
          studentId,
          year,
          reason,
          outingDate,
          slot
        });
        await newOuting.save();
        console.log("Outing created for",name);
        res.status(201).json(
          {
            success:true,
             message:"Outing is created for "+name
        })
    }
    catch(err){
      console.log(err);
        res.status(400).json({
            success:false,
            message:err.message
            
          });
    }
}

const getAllOutings=async(req,res)=>{
    try{
        const outings=await Outing.find().populate("studentId").populate("careTakerId");
        res.status(200).json({
            success: true,
            data: outings
          });
    }
    catch(err){
      console.log(err);
        res.status(400).json({
            success:false,
            message:"message"
          });
    }
}

const getOutingByStudentId=async(req,res)=>{
    try {
        const outing = await Outing.find({"studentId": req.params.id});
        console.log(req.params.id);
        if (!outing) {
          return res.status(404).json({
            success:false,
            message:'Student Outing not found'
          });
        }
        res.status(200).json({success: true,data: outing});
      }
      catch (err) {
        console.log(err);
        res.status(400).json({
          success: false,
          message: err.message
        });
      }
}

const updateOutingStatus=async(req,res)=>{
    try{
        // console.log("bacjkend funtion");
        const {status}=req.body;
        const {outingId} = req.params.id;
        
        const careTakerId=req.user._id;
        console.log(careTakerId);
          // console.log(outingId,careTakerId);
          // console.log(outing);
          // outing.careTakerId = careTakerId;
          // await outing.save();
        const outing=await Outing.findByIdAndUpdate(req.params.id,{status,careTakerId},{new:true}).populate("careTakerId");
        

        if(!outing){
            return res.status(404).json({success:false,message:"Outing not found"});
        }
        res.status(200).json({success:true,message:"Outing found"});
    }
    catch(err){
      // console.log("hi");
      console.log(err);
        res.status(400).json({
          success:false,
          message:err.message
        });
      }
}



const deleteOutingById=async(req,res)=>{
    try{
        const outing=await Outing.findByIdAndDelete(req.params.id);
        if(!outing){
            return res.status(404).json({success:false,message:'Outing not found'});
        }
        res.status(200).json({success:true,message:"Outing found"});
    }
    catch(err){
      console.log(err);
        res.status(400).json({success:false,message:err.message});
    }
}



module.exports={getAllOutings,createOuting,getOutingByStudentId,updateOutingStatus,deleteOutingById};