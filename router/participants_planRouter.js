const express=require("express")
const router=express.Router()
const ppcontroller=require("../controllers/Participants_plan_controller")
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWTStaff=require('../middleware/verifyJWTStaff')

router.get("/:userId",verifyJWT,ppcontroller.getallbyidstudent)
router.get("/getbyplan/:planId",verifyJWTStaff,ppcontroller.getallbyidplan)
router.post("/",verifyJWT,ppcontroller.createparticipant)
router.put("/up/",verifyJWTStaff,ppcontroller.updateUpScore)
router.put("/down/",verifyJWTStaff,ppcontroller.updateDownScore)
router.delete("/:_id",verifyJWTStaff,ppcontroller.deleteparticipant)

module.exports=router
 