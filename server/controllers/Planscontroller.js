const Plans=require("../models/Plans")

const getallplans=('/',async(req,res)=>{
    const plans=await Plans.find().lean()
    res.json(plans)
})

const getplansbyid=('/',async(req,res)=>{
    const{id}=req.params
    if(!id){
        return res.status(404).json({message:"id is required"})
    }
    const plans=await Plans.find({id}).lean
    res.json(plans)
})

const createplan=('/',async(req,res)=>{
    const{name,description,number_of_particpants}=req.body
    if(!name||!description){
        return res.status(400).json({message:"missing data"})
    }
    const plan=await Plans.create({name,description,number_of_particpants})
    res.json(plan)
})

const updateplan=('/',async(req,res)=>{  
    const{_id,name,description,number_of_particpants}=req.body
    if(!_id){
        res.status(400).json({message:"id is required"})
    }
    const plan =await Plans.findById(_id).exec()
    if(!plan){
        res.status(400).json({message:"dont found plan"})
    }
    plan.name=name
    plan.description=description
    plan.number_of_particpants=number_of_particpants
    const saver=await plan.save()
    res.json(saver)
})

const updatenumber_of_particpants=('/',async(req,res)=>{
    const{_id}=req.body
    if(!_id){
        res.status(400).json({message:"id is required"})
    }
    const plan =await Plans.findById(_id).exec()
    if(!plan){
        res.status(400).json({message:"dont found plan"})
    }
    plan.number_of_particpants=plan.number_of_particpants+1
    const saver = await plan.save()
    res.json(saver)
})

const deleteplan=('/',async(req,res)=>{
    const{_id}=req.body
    if(!_id){
        res.status(400).json({message:"id is required"})
    }
    const plan =await Plans.findById(_id).exec()
    if(!plan){
        res.status(400).json({message:"dont found plan"})
    }
    const result=await Plans.deleteOne(plan)
    res.json(result)
})

module.exports={getallplans,getplansbyid,createplan,updateplan,updatenumber_of_particpants,deleteplan}