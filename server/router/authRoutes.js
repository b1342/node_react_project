const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const verifyJWTManger=require('../middleware/verifyJWTManger')

router.post("/login", authController.login)
router.post("/register", verifyJWTManger,authController.register)
module.exports = router