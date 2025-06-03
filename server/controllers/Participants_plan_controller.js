const Participants = require("../models/Participants_ plan")
const Plans = require("../models/Plans")
const Users = require("../models/Users")


const getallbyidstudent=('/',async(req,res)=>{
    const {userId} = req.params
        const participant = await Participants.find({userId}).populate("planId","userId").lean()
        if (!participant) 
            return res.status(400).json({message: "participant not found"})
        res.json(participant)
})

const getallbyidplan=('/',async(req,res)=>{
    const {planId} = req.params
        const participant = await Participants.find({planId}).populate("planId","userId").lean()
        if (!participant) 
            return res.status(400).json({message: "participant not found"})
        res.json(participant)
})

const createparticipant=('/',async(req,res)=>{
    const {userId, planId} = req.body
    if (!userId ||!planId) {
        return res.status(400).json({message: "All fields are required"})
    }
    const exists = await Participants.findOne({ userId, planId });
    if (exists) {
        return res.status(402).json({ message: "Participant already exists for this user and plan" });
    }
    const user = await Users.findById(userId).lean()
    if (!user) {
        return res.status(400).json({message: "User not found"})
    }
    const plan = await Plans.findById(planId).exec()
    if (!plan) {
        return res.status(400).json({message: "Plan not found"})
    }
    plan.number_of_particpants = plan.number_of_particpants+1
    await plan.save()
    const participant = await Participants.create({userName:user.name, userId, planName:plan.name, planId})
    res.json(participant)
})

const updateUpScore=('/',async(req,res)=>{
    const {_id} = req.body
    if (!_id) {
        return res.status(400).json({message: "All fields are required"})
    }
    const participant=await Participants.findById(_id).exec()
    if (!participant) {
        return res.status(400).json({message: "Participant not found"})
    }
    participant.score = participant.score+1
    const updatedParticipant = await participant.save()
    res.json(updatedParticipant)
    
})

const updateDownScore=('/',async(req,res)=>{
    const {_id} = req.body
    if (!_id) {
        return res.status(400).json({message: "All fields are required"})
    }
    const participant=await Participants.findById(_id).exec()
    if (!participant) {
        return res.status(400).json({message: "Participant not found"})
    }
    participant.score = participant.score-1
    const updatedParticipant = await participant.save()
    res.json(updatedParticipant)
    
})

const deleteparticipant=('/',async(req,res)=>{
    const { _id } = req.params
    if (!_id) {
        return res.status(400).json({message: "All fields are required"})
    }
    const participant=await Participants.findById(_id).exec()
    if (!participant) {
        return res.status(400).json({message: "Participant not found"})
    }
    const plan = await Plans.findById(participant.planId).exec()
    if (!plan) {
        return res.status(400).json({message: "Plan not found"})
    }
    plan.number_of_particpants = plan.number_of_particpants-1
    await plan.save()
    await participant.deleteOne()
    res.json(participant)
})

module.exports={getallbyidstudent,getallbyidplan,createparticipant,updateDownScore,updateUpScore,deleteparticipant}