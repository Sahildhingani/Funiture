const ProductModel=require('../Model/Productmodel');

async function GetIndividualProductData(req,resp) {
    try {
        const id=req.query;
        console.log(id.id);
        const data=await ProductModel.findOne({ProductId:id.id});
        return resp.status(200).json({data:data});
    } catch (error) {
        return resp.status(500).json({msg:error});
    }
}

module.exports=GetIndividualProductData;