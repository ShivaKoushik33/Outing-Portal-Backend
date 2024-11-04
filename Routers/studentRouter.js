const studentController=require("../Controllers/studentController");
const express=require("express");
const router=express.Router();
const Authenticate=require("../Middleware/authenticateCareTaker")

router.post("/register",studentController.studentRegister);
router.post("/login",studentController.studentLogin);
router.get("/all-students",studentController.getAllStudents);
router.get("/single-student/:apple",studentController.getStudent);

module.exports=router;