const outingController=require("../Controllers/outingController");
const express=require("express");
const router=express.Router();
const Authenticate=require("../Middleware/authenticateCareTaker");

router.post("/create-outing",Authenticate,outingController.createOuting);
router.get("/allOutings",outingController.getAllOutings);
router.get("/single-outing/:id",outingController.getOutingByStudentId);
// router.put("/update-outing/:id/status",outingController.updateOutingStatus);
router.delete("/delete-outing/:id",outingController.deleteOutingById);
router.put("/update-outing/:id/update",Authenticate,outingController.updateOutingStatus);

module.exports=router;
