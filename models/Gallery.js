const mongoose=require('mongoose')
const galleryschma=new mongoose.Schema({
    filename:{
        type: String
      } ,
    status: {
        type: String,
        enum: ['trips', 'syumim', 'day_in_yeshiva','from_the_last_time','marhey_mekomot','zmaney_tfilot'], 
        default: 'from_the_last_time'
      },
      public:{
        type:Boolean,
        default: false
      },
    uploade_by:{
        type:String
      },
    image:{
        type:String,
        required:true} ,
    imageType:{
        type:String,
      required:true} 

},{
    timestamps:true
}) 


module.exports=mongoose.model("Gallery", galleryschma)


