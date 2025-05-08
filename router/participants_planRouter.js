const express=require("express")
const router=express.Router()
const ppcontroller=require("../controllers/Participants_plan_controller")

router.get("/:userId",ppcontroller.getallbyidstudent)
router.get("/getbyplan/:planId",ppcontroller.getallbyidplan)
router.post("/",ppcontroller.createparticipant)
router.put("/up",ppcontroller.updateUpScore)
router.put("/down",ppcontroller.updateDownScore)
router.delete("/:_id",ppcontroller.deleteparticipant)

module.exports=router
