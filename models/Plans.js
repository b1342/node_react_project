const mongoose=require("mongoose")

const planSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    number_of_particpants :{
        type:Number,
        default:0

    }
},{
    timestamps:true
    
})

module.exports=mongoose.model("Plans",planSchema) 