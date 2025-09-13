const express = require("express");
const filestack = require("filestack-js");
require("dotenv").config();

const router = express.Router();
const client = filestack.init(process.env.FILESTACK_KEY);

// Upload image
router.post("/", async (req, res) => {
  try {
    const file = req.body.file; // base64 string or file buffer
    const result = await client.upload(file);

    res.json({ success: true, url: result.url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

