const mongoose = require("mongoose")
const Participants_planSchema = new mongoose.Schema(

    {
        userName: {
            typy: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        planName: {
            typy: String,
            required: true
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plans'
        },
        score: {
            type: Number,
            required: true
        },
    },

)

module.exports = mongoose.model('Participants_plan', Participants_planSchema)