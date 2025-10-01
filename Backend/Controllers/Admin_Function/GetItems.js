const ProductModel = require('../Model/Productmodel');

const GetItems = async (req, resp) => {
    try {
        const { page = 1, limit = 10, query, ...filters } = req.query;

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;

        // 🔍 Build search condition
        let cond = { ...filters };

        if (query && query.trim() !== "") {
            cond.$or = [
                { ProductName: { $regex: query, $options: "i" } },
                { ProductDesc: { $regex: query, $options: "i" } },
                { ProductTags: { $regex: query, $options: "i" } },
                { ProductCatogery:{ $regex: query, $options: "i" } },
            ];
        }

        const total = await ProductModel.countDocuments(cond);
        const data = await ProductModel.find(cond)
            .skip(skip)
            .limit(limitNum);

        return resp.status(200).json({
            msg: "Request Successful",
            Data: data,
            total,
            hasMore: skip + data.length < total, // ✅ flag for frontend
        });
    } catch (error) {
        return resp.status(500).json({
            msg: "Backend issue at get request of product",
            error: error.message,
        });
    }
};

module.exports = GetItems;


