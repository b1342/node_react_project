const mongoose = require("mongoose")
const Participants_planSchema = new mongoose.Schema(

    {
        userName: {
            type: String
            
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        planName: {
            type: String
           
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plans',
            required: true
        },
        score: {
            type: Number,
            default: 0
        },
    },

)

module.exports = mongoose.model('Participants_plan', Participants_planSchema)