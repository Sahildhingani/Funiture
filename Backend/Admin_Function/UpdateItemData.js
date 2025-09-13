const ProductModel = require("../Model/Productmodel");

const UpdateItem = async (req, resp) => {
  try {
    console.log(req.body);
    const {
      ProductId,
      ProductName,
      ProductDesc,
      ProductPrice,
      ProductCatogery,
      ProductImage,
      ProductBrand,
      ProductAdditionalInfo,
      TopRated,
      MostSelling,
    } = req.body;

    const updatedData = await ProductModel.findOneAndUpdate(
      { ProductId }, 
      {
        ProductName,
        ProductDesc,
        ProductPrice,
        ProductCatogery,
        ProductImage,
        ProductBrand,
        ProductAdditionalInfo,
        TopRated,
      MostSelling,
      },
      { new: true } // return updated document
    );

    if (updatedData) {
      return resp.status(200).json({ msg: "Data Updated Successfully", updatedData });
    } else {
      return resp.status(404).json({ msg: "Data not found for update" });
    }
  } catch (error) {
    console.error("Update error:", error);
    return resp.status(500).json({
      msg: "Backend Issue",
      error,
    });
  }
};

module.exports = UpdateItem;


