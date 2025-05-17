const express = require("express")
const router = express.Router()
const userControler = require("../controllers/Userscontroller")
const verifyJWTManger=require('../middleware/verifyJWTManger')
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWTStaff=require('../middleware/verifyJWTStaff')

router.post("/", verifyJWTManger,userControler.creatUser)
router.get("/:status",verifyJWTStaff,userControler.getByType)
router.get("/getbyid/:_id",verifyJWTStaff ,userControler.getUserById)
router.put("/", verifyJWTManger,userControler.updateUser)
router.delete("/:_id",verifyJWTManger ,userControler.deleteUser)

module.exports = router 