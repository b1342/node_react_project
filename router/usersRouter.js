const express = require("express")
const router = express.Router()
const userControler = require("../controllers/Userscontroller")

router.post("/", userControler.creatUser)
router.get("/:status", userControler.getByType)
router.get("/getbyid/:_id", userControler.getUserById)
router.put("/", userControler.updateUser)
router.delete("/:_id", userControler.deleteUser)


module.exports = router 