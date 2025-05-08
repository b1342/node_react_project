const Achievements = require("../models/Achievements")

const getAllAchievementsById = ('/', async (req, res) => {
    
    const { userId } = req.params
    if (!userId)
        return res.status(400).json({ message: 'enter userId' })
    const allAchievements = await Achievements.find({userId: userId })
    res.json(allAchievements)
})

const createAchievement = ('/', async (req, res) => {
    const { userId, achievement, date } = req.body//הid של התלמיד
    if (!userId || !achievement)
        return res.status(400).json({ message: 'enter data' })
    const achievement1 = await Achievements.create({ achievement, date })
    if (!achievement1)
        return res.status(404).json({ message: 'achievement did not create' })
    res.json(achievement1)
})

const updateAchievement = ('/', async (req, res) => {
    const { _id, achievement, date } = req.body
    const achievement1 = await Achievements.findById(_id).exec()
    if (!achievement1)
        return res.status(404).json({ message: 'achievement not found' })
    achievement1.achievement = achievement
    if (date)
        achievement1.date = date
    const saveAchievement = await achievement1.save()
    res.json(saveAchievement)
})

const deleteAchievement = ('/', async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: 'enter id' })
    const achievement1 = await Achievements.findById(id).exec()
    if (!achievement1)
        return res.status(404).json({ message: 'achievement not found' })
    const result = await Achievements.deleteOne(achievement1)
    res.json(`'${achievement1.achievement}' deleted`)
})

module.exports = { getAllAchievementsById, createAchievement, updateAchievement, deleteAchievement }


// const updateAchievements=('/',async(req,res)=>{
// const{id,achievement1}=req.body
// const user=await Users.findById(id).exec()
// if (!user)
//     return res.status(404).json({ message: 'user not found' })
// user.achievements.find()

// const updateUser = await user.save()
// res.json(`'${updateUser.name}' achievements -updated`)
// })

// const createAchievements = ('/', async (req, res) => {
//     const { id, achievement1 } = req.body
//     const user = await Users.findById(id).exec()
//     if (!user)
//         return res.status(404).json({ message: 'user not found' })
//     user.achievements.push(achievement1)

//     const createAchievement = await user.save()
//     res.json(`'${createAchievement.name}' achievements -add`)
// })
