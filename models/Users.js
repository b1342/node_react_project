const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        identity_number: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,

        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        date_of_birth: {
            type: Date
        },
        status: {
            type: String,
            enum: ['student', 'staff', 'manager'],
            required: true,
            
        }

    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Users', userSchema)

