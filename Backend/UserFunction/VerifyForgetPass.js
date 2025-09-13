const ForgetPassModel=require('../Model/ForgetPassCode');


async function VerifyForgetCode(req,resp) {
    try {
        console.log(req.query);
        const {UserEmail,code}=req.query;
        const data=await ForgetPassModel.findOne({UserEmail});
        if(data.Code==code){
            return resp.status(200).json({Msg:"Code is correct"});
        }
    } catch (error) {
        return resp.status(500).json({msg:"Error"});
    }
}

module.exports=VerifyForgetCode;