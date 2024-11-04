    const Student=require("../Models/Student");
    const bcrypt=require("bcryptjs");
    const jwt=require("jsonwebtoken");
    const dotEnv=require("dotenv");
    // const CareTaker = require("../Models/CareTaker");
    dotEnv.config();
    const secretKey=process.env.WhatIsYourName;



    //necessary functions for signup

    // const validateEmail=(email)=>{
    //     const emailRegex = /^[nN](20|21|22|23|24)\d{4}@rguktn\.ac\.in$/;
    //     return emailRegex.match(email);
    // }

    const studentRegister=async(req,res)=>{
        const{name,email,password}=req.body;
        try{
            const studentEmail=await Student.findOne({email});
            // if(!validateEmail(studentEmail)){
            //     return res.status(400).json("Enter valid rguktn mail address");
            // }
            if(studentEmail){
                return res.status(400).json({error:"Email already exists"});
            }
            const id1=email.slice(0,7);

            const hashedPassword=await bcrypt.hash(password,10);
            const newStudent=new Student({
                name,
                email,
                password:hashedPassword,
                id:id1
            });
            await newStudent.save();
            console.log('Student registered');
            return res.status(201).json("Student registered successfully");
        }
        catch(error){
            console.log(error);
            res.status(500).json({error:"Internal Server Error"});
        }
    }

    const studentLogin=async(req,res)=>{
        const{email,password}=req.body;
        console.log(email,password);
        try{
            const student=await Student.findOne({email});
            console.log(student);
            if(!student || !(await bcrypt.compare(password,student.password))){
                return res.status(401).json({error:"Invalid login Credentials"});
            }
            console.log(student);
            const token=jwt.sign({studentId:student._id,name:student.name,id:student.id},secretKey,{expiresIn:"2h"});
            
            res.status(200).json({message:"Sucessful Login",token});
            console.log(email,"\nToken:",token);
        }
        
        catch(error){
            console.log(error);
            res.status(500).json({error:"Internal Server Error"});
        }   
    }

    const getStudent=async(req,res)=>{
        const studentId=req.params.apple;
        try{
            const student=await Student.findById(studentId);
            if(!student){
                return res.status(404).json({error:"Student not found"});
            }
            res.status(200).json({student});   
        }
        catch(error){
            console.log(error);
            res.status(500).json({error:"Internal Server Error"});
        } 
    }

    const getAllStudents=async(req,res)=>{
        try{
            const students=await Student.find();
            res.status(201).json({students});
        }
        catch(error){
            console.log(error);
            res.status(500).json({error:"Internal Server Error"});
        }
    }
    module.exports={studentLogin,studentRegister,getStudent,getAllStudents}