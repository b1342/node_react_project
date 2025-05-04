const Plans=require("../models/Plans")

const getallplans=('/',async(req,res)=>{
    const plans=await Plans.find().lean()
    res.json(plans)
})