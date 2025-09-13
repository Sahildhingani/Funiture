const OrderModel=require('../Model/OrderPlacedModel');

async function OrderList(req,resp) {
    try {
        const d=req.query;
        const data=await OrderModel.find(d);

        return resp.status(200).json({data:data});
    } catch (error) {
        return resp.status(500).json({error:error});
    }
}
module.exports=OrderList;