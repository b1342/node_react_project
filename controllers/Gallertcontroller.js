const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Gallery=require('../models/Gallery')


const getallgallery=('/',async(req,res)=>{
    const gallery=await Gallery.find()
    res.json(gallery.map(g => ({
        id: g._id,
        status: g.status,
        public:g.public,
        uploade_by:g.uploade_by,
        imageType:g.imageType,
        imageSrc: g.imageSrc
      })));

})

const getspcgallery=('/',async(req,res)=>{
    const type=req.params
    const gallery = await Gallery.find({ status: type })
    if(!gallery)
        res.status(404).json({message:"gallery not found"})
    res.json(gallery.map(g => ({
        id: g._id,
        status: g.status,
        public:g.public,
        uploade_by:g.uploade_by,
        imageType:g.imageType,
        imageSrc: g.imageSrc
      })));
})

const createnew=('/',async(req,res)=>{
    try {
        const { title, status,public, uploade_by,} = req.body;
        const img = req.file;
    
        const newGallery = new Gallery({
          title,
          status,
          public,
          uploade_by,
          image: img.buffer, 
          imageType: img.mimetype 
        });
    
        await newGallery.save();
        res.status(201).json(newGallery,{ message: 'Image uploaded successfully!' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    })
const changestatus=('/',async(req,res)=>{
    const{_id,status}=req.body
    if(!_id){
        return res.status(400).json({message:'cant search without _id'})}
    const img=await Gallery.findById(_id).exec()
    if(!img){
        res.status(400).json({message:"img not found..."})
    }
    img.status=status
    const saver=img.save()
    res.json(saver)
})

const changepublic=('/',async(req,res)=>{
    const {_id,public}=req.body
    if(!_id){
        return res.status(400).json({message:'cant search without _id'})}
    const img=await Gallery.findById(_id).exec()
    if(!img){
        res.status(400).json({message:"img not found..."})
    }
    img.public=!public
    const saver=img.save()
    res.json(saver)
})

const deletefromgallry=('/',async(req,res)=>{
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

module.exports={upload,getallgallery,getspcgallery,createnew,changestatus,changepublic,deletefromgallry}
