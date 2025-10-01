const ContactUsModel = require('../../Model/ContactUsModel');

async function SetContactInfo(req, resp) {
  try {
    const { UserName, UserEmail, UserSubject, UserMess } = req.body;

    // Basic validation
    if (!UserName || !UserEmail || !UserSubject || !UserMess) {
      return resp.status(400).json({ msg: "All fields are required" });
    }

    // Save data
    const data = await ContactUsModel.create({
      UserName,
      UserEmail,
      UserSubject,
      UserMess,
    });

    // Respond with success
    resp.status(201).json({
      msg: "Contact info saved successfully",
      data,
    });
  } catch (error) {
    console.error("Error in SetContactInfo:", error.message);
    resp.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
}

module.exports = SetContactInfo;
