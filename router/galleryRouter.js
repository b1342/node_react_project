const express=require('express')
const router=express.Router()
const gallerycontroller=require('../controllers/Gallertcontroller')

router.get('/',gallerycontroller.getallgallery)
router.get('/:type',gallerycontroller.getspcgallery)
router.post('/', gallerycontroller.upload.single('image'), gallerycontroller.createnew);
router.put('/status/',gallerycontroller.changestatus)
router.put('/public/',gallerycontroller.changepublic)
router.delete('/',gallerycontroller.deletefromgallry)

module.exports=router

