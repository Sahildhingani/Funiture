const { nanoid } = require("nanoid");
const ProductModel = require("../Model/Productmodel");

const AddItems = async (req, resp) => {
  try {
    const id = nanoid();
    const {
      ProductName,
      ProductDesc,
      ProductPrice,
      ProductCatogery,
      ProductBrand,
      ProductAdditionalInfo,
      TopRated,
      MostSelling,
      ProductImage, // URL comes directly from frontend
    } = req.body;

    if (!ProductImage) {
      return resp.status(400).json({ msg: "Product image URL is required" });
    }

    // Create product in database
    const data = await ProductModel.create({
      ProductId: id,
      ProductName,
      ProductDesc,
      ProductPrice,
      ProductCatogery,
      ProductImage, // save URL directly
      ProductBrand,
      ProductAdditionalInfo,
      TopRated,
      MostSelling,
    });

    if (data) {
      return resp.status(200).json({ msg: "Item Added Successfully", data });
    } else {
      return resp.status(500).json({ msg: "Failed to add item" });
    }
  } catch (error) {
    return resp
      .status(500)
      .json({ msg: "Backend issue check Add item file", error });
  }
};

module.exports = AddItems;
