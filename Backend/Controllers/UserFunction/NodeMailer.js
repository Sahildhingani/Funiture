const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sahildhingani51@gmail.com',
        pass: 'hgkp mvfh wngf ypoa' // Gmail App Password
    }
});
    
// Async function to send email
async function sendEmail(to, subject, text) {
    try {
        let info = await transporter.sendMail({
            from: 'sahildhingani51@gmail.com',
            to: to,
            subject: subject,
            text: text
        });
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


module.exports=sendEmail;   