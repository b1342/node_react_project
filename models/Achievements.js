const mongoose = require("mongoose")
const achievementsSchema = new mongoose.Schema(
    {
       userId:
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
        ,
        achievement: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Achievements', achievementsSchema)
