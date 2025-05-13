const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/Uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage })
const Gallery=require('../models/Gallery')



const GetAllGallery=('/',async(req,res)=>{
    const gallery=await Gallery.find()
    res.json(gallery);

})

const GetsSpcGallery=('/',async(req,res)=>{
    const {type}=req.params
    const gallery = await Gallery.find({ status: type })
    res.json(gallery);
})

const CreatNnew=('/',async(req,res)=>{
    try {
        const { title, status,public, uploade_by,} = req.body;
        const img = req.file;
    
        const newGallery = new Gallery({
          filename: img.filename,
          title,
          status,
          public,
          uploade_by,
          image: req.file.path, 
          imageType: img.mimetype 
        });
    
        const savedImage=await newGallery.save();
        res.json(`${savedImage} image saved`);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    })

const ChangeStatus=('/',async(req,res)=>{
    const{_id,status}=req.body
    if(!_id){
        return res.status(400).json({message:'cant search without _id'})}
    const img=await Gallery.findById(_id).exec()
    if(!img){
        res.status(400).json({message:"img not found..."})
    }
    img.status=status
    const saver=await img.save()
    res.json(saver)
})

const ChangePublic=('/',async(req,res)=>{
    const {_id,public}=req.body
    if(!_id){
        return res.status(400).json({message:'cant search without _id'})}
    const img=await Gallery.findById(_id).exec()
    if(!img){
        res.status(400).json({message:"img not found..."})
    }
    img.public=!public
    const saver=await img.save()
    res.json(saver) 
})

const DeleteFromGallery=('/',async(req,res)=>{
    const{_id}=req.body
    if(!_id){
        return res.status(400).json({message:'cant search without _id'})}
        const img=await Gallery.findById(_id).exec()
        if(!img){
            res.status(400).json({message:"img not found..."})
        }
    const saver=await Gallery.deleteOne(img)
    res.json(saver)
}) 

module.exports={upload,ChangeStatus,ChangePublic,DeleteFromGallery,CreatNnew,GetsSpcGallery,GetAllGallery}
