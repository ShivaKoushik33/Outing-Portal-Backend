const careTakerController=require("../Controllers/careTakerController");
const express =require("express");
const router=express.Router();

router.post("/register",careTakerController.careTakerRegister);
router.post("/login",careTakerController.careTakerLogin);
router.get("/all-caretakers",careTakerController.getAllCareTakers);
router.get("/single-caretaker/:apple",careTakerController.getCareTaker);

module.exports=router;