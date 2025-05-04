const mongoose=require("mongoose")

const planSchema=mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    number_of_particpants :{
        type:Number
    }
},{
    timestamps:true
    
})

module.exports=mongoose.model("Plans",planSchema) 