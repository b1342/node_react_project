const bcrypt=require('bcrypt')
const User = require("../models/Users")
const jwt= require('jsonwebtoken')

const register = async (req,res)=>{
    const { name, identity_number, password, phone, address, email, date_of_birth, status } = req.body
    if (!name || !identity_number || !password || !phone || !address|| !status)
        return res.status(400).json({ message: 'Missing data' })
    const duplicate = await User.findOne({ identity_number }).lean()
    if (duplicate) 
        return res.status(409).json({ message: 'Duplicate identity number' }) 
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({name,identity_number,password: hashedPassword,phone,address,email,date_of_birth,status})
    if (user) {
        return res.status(201).json({ message: `New user ${name} created` })
    }       
    return res.status(400).json({ message: 'Invalid user data received' })
}

const login = async (req,res)=>{ 
    const { identity_number, password } = req.body
    if (!identity_number || !password) 
        return res.status(400).json({ message: 'username and password are required!' })
    const foundUser = await User.findOne({ identity_number }).lean()
    if (!foundUser|| !foundUser.active) 
        return res.status(401).json({ message: 'Unauthorized' }) 
    const match = await bcrypt.compare(password, foundUser.password)
    const userinfo = {_id: foundUser._id,name: foundUser.name,identity_number: foundUser.identity_number,phone: foundUser.phone,
        address: foundUser.address,email: foundUser.email,date_of_birth: foundUser.date_of_birth,status: foundUser.status
    }
    const accessToken=jwt.sign({userinfo},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' }) 
    res.json({accessToken:accessToken,user:userinfo,role:userinfo.status})

}

module.exports = {login, register} 