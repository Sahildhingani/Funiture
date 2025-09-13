const CodeModel = require('../Model/CodeModel');
const GenerateCode = require('./GenerateCode');
const sendEmail = require('./NodeMailer');

async function SendEmail(req, resp) {
    try {
        console.log('request received');
        const code = String(GenerateCode());
        const { UserEmail} = req.query; // Or req.body if you're sending in POST body

        // Check if code already exists for this email
        let data = await CodeModel.findOne({ UserEmail });
        let response;
        if (!data) {
            // Save code in database
            response = await CodeModel.create({ UserEmail, Code: code });
        } else {
            // Update the existing code with a new one
            data.Code = code;
            response = await data.save();
        }

        // Send code through email 
        if (response) {
            await sendEmail(
                UserEmail,
                "Verify Your Email for Furniture",
                `This is your verification code: ${code}`
            );
            return resp.status(200).json({ message: "Email sent successfully" });
        }

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = SendEmail;

