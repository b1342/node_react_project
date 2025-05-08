const express = require("express")
const router = express.Router()
const achievementControler = require("../controlers/Achievements")

router.post("/", achievementControler.createAchievement)
router.get("/:id", achievementControler.getAllAchievementsById)
router.put("/", achievementControler.updateAchievement)
router.delete("/:id", achievementControler.deleteAchievement)

module.exports = router