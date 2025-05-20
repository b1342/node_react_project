const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage'); // מייבא את GridFsStorage
const multer = require('multer'); // מייבא את multer 
const Grid = require('gridfs-stream');

let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads'); // כמו "טבלה" של התמונות
});

// הגדרת Storage (מולטר יודע לשמור ישירות ב־GridFS)
const storage = new GridFsStorage({
  url: process.env.DATABASE_URI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return {
      bucketName: 'uploads', // טבלת קבצים
      filename: `${Date.now()}-${file.originalname}`, // שם ייחודי
    };
  },
});

const upload = multer({ storage });

module.exports={gfs,upload}