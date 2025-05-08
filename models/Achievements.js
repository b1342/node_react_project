const mongoose = require("mongoose")
const achievementsSchema = new mongoose.Schema(
    {
       userId:
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users' 
        }
        ,
        achievement: {
            type: String,
            required: true
        },
        date: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Achievements', achievementsSchema)
