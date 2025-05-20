const express=require("express")
const router=express.Router()
const planscontroller=require("../controllers/Planscontroller")
const verifyJWTManger=require('../middleware/verifyJWTManger')
const verifyJWT=require('../middleware/verifyJWT')
const verifyJWTStaff=require('../middleware/verifyJWTStaff')

router.get('/',verifyJWT,planscontroller.getallplans)
router.get('/:id',verifyJWT,planscontroller.getplansbyid)
router.post('/',verifyJWTStaff,planscontroller.createplan)
router.put('/',verifyJWT,planscontroller.updateplan)
router.put('/number_of_particpants',verifyJWTStaff,planscontroller.updatenumber_of_particpants)
router.delete('/',verifyJWTManger,planscontroller.deleteplan)

module.exports=router