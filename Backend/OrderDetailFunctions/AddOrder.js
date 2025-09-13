const OrderDetailMode=require('../Model/OrderPlacedModel');


async function AddOrderDetail(req,resp) {
    try {
        const {UserEmail,UserName,UserPhone,UserAddress,OrderDetail}=req.body;
        console.log(req.body);
        const data=await OrderDetailMode.create({UserEmail,UserName,UserPhone,UserAddress,OrderDetail});
        return resp.status(200).json({msg:"Ordered Placed",data:data});
    } catch (error) {
        return resp.status(500).json({msg:`Error,${error}`})
    }
}

module.exports=AddOrderDetail;