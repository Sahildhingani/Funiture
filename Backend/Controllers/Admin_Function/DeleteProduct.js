const ProductModel = require("../Model/Productmodel");
const fs = require("fs");
const path = require("path");

const DeleteItem = async (req, resp) => {
  try {
    const { ProductId } = req.body;
    
    // Find product first
    const r = await ProductModel.findOne({ ProductId });
    if (!r) {
      return resp.status(404).json({ msg: "Product not found" });
    }

    const ProductImage = r.ProductImage;

    // Build correct absolute path to the file
    const imagePath = path.join(
      __dirname,
      "..",
      "Multer",
      "StoreImage",
      ProductImage
    );
    console.log("Deleting image from:", imagePath);

    // // Delete the file (async but non-blocking)
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });

    // Delete product from DB
    const data = await ProductModel.findOneAndDelete({ ProductId });

    if (data) {
      return resp.status(200).json({ msg: "Item Deleted Successfully", data });
    } else {
      return resp.status(404).json({ msg: "Facing Issue on deleting element" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return resp.status(500).json({ msg: "Backend issue on deleting item", error });
  }
};

module.exports = DeleteItem;

