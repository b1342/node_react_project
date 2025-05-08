const express = require("express")
const router = express.Router()
const achievementControler = require("../controllers/AchievementsController")

router.post("/", achievementControler.createAchievement)
router.get("/:userId", achievementControler.getAllAchievementsById)
router.put("/", achievementControler.updateAchievement)
router.delete("/:_id", achievementControler.deleteAchievement)

module.exports = router