const CareTaker=require("../Models/CareTaker");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotEnv=require("dotenv");

// const CareTaker = require("../Models/CareTaker");
dotEnv.config();
const secretKey=process.env.WhatIsYourName;


 const careTakerRegister=async(req,res)=>{
    const{name,email,password,mobile}=req.body;
    try{
        const CareTakerEmail=await CareTaker.findOne({email});
        if(CareTakerEmail){
            return res.status(400).json({error:"Email already exists"});
        }
        const CareTakerPhone=await CareTaker.findOne({mobile});
        if(CareTakerPhone){
            return res.status(400).json({error:"Phone number already registered"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newCareTaker=new CareTaker({
            name,
            email,
            password:hashedPassword,
            mobile
        });
        await newCareTaker.save();
        console.log("CareTaker Registered");
        return res.status(201).json("CareTaker registerd successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
 }

 const careTakerLogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const careTaker=await CareTaker.findOne({email});
        if(!careTaker || !(await bcrypt.compare(password,careTaker.password))){
            return res.status(401).json({error:"Invalid login Credentials"});
        }
        const token=jwt.sign({careTakerId:careTaker._id,name:careTaker.name},secretKey,{expiresIn:"2h"});
        res.status(200).json({message:"Sucessful Login",token});
        console.log(email,"\nToken:",token);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }   
 }

const getAllCareTakers=async(req,res)=>{
    try{
        const careTakers=await CareTaker.find();
        res.status(200).json({careTakers});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getCareTaker=async(req,res)=>{
    const careTakerId=req.params.apple;
    try{
        const careTaker=await CareTaker.findById(careTakerId);
        if(!careTaker){
            return res.status(404).json({error:"CareTaker not found"});
        }
        res.status(200).json({careTaker});   
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    } 
}

 module.exports={careTakerRegister,careTakerLogin,getAllCareTakers,getCareTaker};