const UserModel=require('../Model/UserModel');

async function userbackenddata(req,resp) {
    try {
        const {UserEmail}=req.body;
        const data=await UserModel.find({UserEmail});
        return resp.status(200).json({'msg':data});
    } catch (error) {
        return resp.status(500).json('data send error',error);
    }

}

module.exports=userbackenddata;