const express=require('express')
const router=express.Router()
const gallerycontroller=require('../controllers/Gallertcontroller')
const verifyJWTManger=require('../middleware/verifyJWTManger')
const verifyJWT=require('../middleware/verifyJWT')

router.get('/',verifyJWT,gallerycontroller.GetAllGallery)
router.get('/:type',verifyJWT,gallerycontroller.GetsSpcGallery)
router.post('/',verifyJWT,gallerycontroller.upload.single('image'), gallerycontroller.CreatNnew);
router.put('/status/',verifyJWT,gallerycontroller.ChangeStatus)
router.put('/public/',verifyJWTManger,gallerycontroller.ChangePublic)
router.delete('/',verifyJWT,gallerycontroller.DeleteFromGallery)

module.exports=router

