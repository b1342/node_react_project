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
        type:Buffer,
        required:true} ,
    imageType:{
        type:String,
      required:true} 

},{
    timestamps:true
}) 


galleryschma.virtual('imageSrc').get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};base64,${this.image.toString('base64')}`;
  }
});
module.exports=mongoose.model("Gallery", galleryschma)


