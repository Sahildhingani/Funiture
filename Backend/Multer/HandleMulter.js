const filestack = require("filestack-js");
require("dotenv").config();

// Initialize Filestack client
const client = filestack.init(process.env.FILESTACK_KEY);

// Upload function (instead of Multer middleware)
async function uploadFile(fileBuffer) {
  try {
    // Upload to Filestack
    const result = await client.upload(fileBuffer);

    // result.url gives the CDN URL
    return result.url;
  } catch (error) {
    console.error("❌ Filestack Upload Error:", error);
    throw error;
  }
}

module.exports = uploadFile;


