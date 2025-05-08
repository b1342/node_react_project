const express=require('express')
const router=express.Router()
const gallerycontroller=require('../controllers/Gallertcontroller')

router.get('/',gallerycontroller.GetAllGallery)
router.get('/:type',gallerycontroller.GetsSpcGallery)
router.post('/', gallerycontroller.upload.single('image'), gallerycontroller.CreatNnew);
router.put('/status/',gallerycontroller.ChangeStatus)
router.put('/public/',gallerycontroller.ChangePublic)
router.delete('/',gallerycontroller.DeleteFromGallery)

module.exports=router

