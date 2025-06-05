// backend/services/emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
    // צור transporter (הגדרות שרת SMTP)
    // השתמש בפרטי שרת המייל שלך (Gmail, Outlook, SendGrid, Mailgun וכו')
    // לדוגמה, עבור Gmail (פחות מומלץ לייצור, עדיף להשתמש ב-SendGrid/Mailgun וכו'):
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ניתן גם להגדיר host ו-port
        auth: {
            user: process.env.EMAIL_USER, // המייל ששולח את ההודעה (לדוגמה: your-app-email@gmail.com)
            pass: process.env.EMAIL_PASS // הסיסמה או App Password עבור המייל הזה
        }
    });

    // הגדרות המייל
    const mailOptions = {
        from: process.env.EMAIL_USER, // כתובת המייל השולחת
        to: to,                      // כתובת המייל של הנמען (זה המייל של המנהל!)
        subject: subject,            // נושא המייל
        text: text,                  // גוף המייל כטקסט פשוט
        html: html                   // גוף המייל כ-HTML (אופציונלי, עדיף לרוב)
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = sendEmail;