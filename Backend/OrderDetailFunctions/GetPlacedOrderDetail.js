const OrderDetailMode=require('../Model/OrderPlacedModel');

async function GetPlacedOrderDetail(req, resp) {
  try {
    const { UserEmail } = req.query;
    console.log("Backend got:", UserEmail);

    const data = await OrderDetailMode.find({ UserEmail: UserEmail });
    console.log(data);
    return resp.status(200).json({ msg: "OrderDetail", data });
  } catch (error) {
    console.error("Error:", error);
    resp.status(500).json({ msg: "Req get Failed" });
  }
}


module.exports=GetPlacedOrderDetail;