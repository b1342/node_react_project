const Users = require("../models/Users")

const getByType = ('/', async (req, res) => {
    const {status}=req.params
    const users = await Users.find({ status }).lean()
    if (!users) {    
        return res.status(404).json({ message: 'No users found' })
    }
    res.json(users)
})

const getUserById = ('/', async (req, res) => {
    const {_id} = req.params
    if (!_id) {
        return res.status(400).json({ message: 'Missing data "id" ' })
    }
    const user = await Users.findById(_id).lean()
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
})


const creatUser = ('/', async (req, res) => {
    const { name, identity_number, password, phone, address, email, date_of_birth, status } = req.body
    if (!name || !identity_number || !password || !phone || !address || !status)
        return res.status(400).json({ message: 'Missing data' })
    const duplicate = await Users.findOne({ identity_number }).lean()
    if (duplicate) 
        return res.status(409).json({ message: 'Duplicate identity number' }) 
    const user = await Users.create({ name, identity_number, password, phone, address, email, date_of_birth, status })
    if (!user)
        return res.status(404).json({ message: 'did not creat new user' })
    res.json(user)
})


const updateUser = ('/', async (req, res) => {
    const { _id, name,identity_number, password, phone, address, email, date_of_birth, status } = req.body
    if (!_id)
        return res.status(400).json({ message: 'Missing data "id" ' })
    const user = await Users.findById(_id).exec()
    if (!user)
        return res.status(404).json({ message: 'user not found' })
    const duplicate = await Users.findOne({ identity_number }).lean()
    if (duplicate && duplicate._id.toString() !== _id)
        return res.status(409).json({ message: 'Duplicate identity number' })

    user.name = name
    user.password = password
    user.phone = phone
    user.address = address
    user.identity_number =identity_number
    if (email)
        user.email = email
    if (date_of_birth)
        user.date_of_birth = date_of_birth
    user.status = status

    const updateUser = await user.save()
    res.json(`'${user.name}' updated`)
})

const deleteUser = ('/', async (req, res) => {
    const { _id } = req.params
    if (!_id)
        return res.status(400).json({ message: 'enter id' })
    const user = await Users.findById(_id).exec()
    if (!user)
        return res.status(404).json({ message: 'user not found' })
    const result = await Users.deleteOne(user._id)
    res.json(`'${user.name}' deleted`)
})

module.exports = { getByType, getUserById, creatUser, updateUser, deleteUser }