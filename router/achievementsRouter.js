const express = require("express")
const router = express.Router()
const achievementControler = require("../controllers/AchievementsController")
const verifyJWTManger=require('../middleware/verifyJWTManger')
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWTStaff=require('../middleware/verifyJWTStaff')

router.post("/",verifyJWTStaff,achievementControler.createAchievement)
router.get("/:userId",verifyJWT,achievementControler.getAllAchievementsById)
router.put("/", verifyJWTStaff,achievementControler.updateAchievement)
router.delete("/:_id",verifyJWTStaff,achievementControler.deleteAchievement)

module.exports = router