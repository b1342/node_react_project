const express=require("express")
const router=express.Router()
const planscontroller=require("../controllers/Planscontroller")

router.get('/',planscontroller.getallplans)
router.get('/:id',planscontroller.getplansbyid)
router.post('/',planscontroller.createplan)
router.put('/',planscontroller.updateplan)
router.put('/',planscontroller.updatenumber_of_particpants)
router.delete('/',planscontroller.deleteplan)

module.exports=router