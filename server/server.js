require("dotenv").config()//התקנת DOTENV
const express=require("express")//חבילת אקספרס
const cors=require("cors") //חבילת CORS
const mongoose = require('mongoose') //חבילת מונגוס - להתחבר לדטה
const corsOptions = require("./config/corsOptions")//ייבוא של הרשימה לבנה
const connectDB = require("./config/dbConn")//פונקצית החיבור לDB 
const PORT = process.env.PORT|| 1234 //הגדרת הפורט
const app = express() //הפעלת הפונקציה למשתנה APP
const sendEmail= require('./controllers/emailController')

connectDB() //קריאה לפונקציה שמפעילה את הDB
app.use(cors(corsOptions))// הפעלת רשימה לבנה
app.use(express.json())// היכולת לעשות PUT וPOST
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use('/api/gallery',require('./router/galleryRouter'))
app.use('/api/plans',require('./router/planRouter'))
app.use('/api/user', require('./router/usersRouter'))
app.use('/api/achievements', require('./router/achievementsRouter'))
app.use('/api/participants', require('./router/participants_planRouter'))
app.use("/api/auth", require("./router/authRoutes"))//הגדרת הAPI של האוטנטיקציה



app.post('/api/contact', async (req, res) => {
    const { inquiryText } = req.body;

    if (!inquiryText) {
        return res.status(400).json({ message: 'תוכן הפנייה חובה.' });
    }

    // המייל של המנהל שאליו תישלח הפנייה!
    const adminEmail = process.env.ADMIN_EMAIL;
    const subject = 'פנייה חדשה מדף הבית';
    const text = `נשלחה פנייה חדשה מדף הבית:\n\n${inquiryText}`;
    const html = `<p><b>נשלחה פנייה חדשה מדף הבית:</b></p><p>${inquiryText}</p>`;

    const emailSent = await sendEmail(adminEmail, subject, text, html);

    if (emailSent) {
        res.status(200).json({ message: 'הפנייה נשלחה בהצלחה.' });
    } else {
        res.status(500).json({ message: 'שגיאה בשליחת הפנייה.' });
    }
});

mongoose.connection.once('open', () => {//פונקציה לבדיקה שיש חיבור כל הזמן
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
    })
    mongoose.connection.on('error', err => {
    console.log(err) 
    
    })