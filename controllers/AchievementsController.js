const Achievements = require("../models/Achievements")

const getAllAchievementsById = ('/', async (req, res) => {
    
    const { userId } = req.params
    if (!userId)
        return res.status(400).json({ message: 'enter userId' })
    const allAchievements = await Achievements.find({userId }).lean()
    if (!allAchievements || allAchievements.length === 0)
        return res.status(404).json({ message: 'achievements not found' })
    res.json(allAchievements)
})

const createAchievement = ('/', async (req, res) => {
    const { userId, achievement, date } = req.body//הid של התלמיד
    if (!userId || !achievement)
        return res.status(400).json({ message: 'enter data' })
    const achievement1 = await Achievements.create({userId, achievement, date })
    if (!achievement1)
        return res.status(404).json({ message: 'achievement did not create' })
    res.json(achievement1)
})

const updateAchievement = ('/', async (req, res) => {
    const { _id, achievement,date} = req.body
    if ( !_id || !achievement)
        return res.status(400).json({ message: 'enter data' })  
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
    const { _id } = req.params
    if (!_id)
        return res.status(400).json({ message: 'enter id' })
    const achievement1 = await Achievements.findById(_id).exec()
    if (!achievement1)
        return res.status(404).json({ message: 'achievement not found' })
    const result = await Achievements.deleteOne(achievement1._id)
    res.json(`'${achievement1.achievement}' deleted`)
})

module.exports = { getAllAchievementsById, createAchievement, updateAchievement, deleteAchievement }
