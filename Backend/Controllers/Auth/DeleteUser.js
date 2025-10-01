const UserModel=require('../Model/UserModel');


const RemoveUser=async (req,resp) => {
    try {
        const UserEmail=req.UserEmail; // get the email form jwt token

        // find the user
        const user=await UserModel.findOneAndDelete({UserEmail});

        if(!user){
            return resp.status(400).json({msg:"User Delete Issue"});
        }
        return resp.status(200).json({msg:"User Account Deleted"});
    } catch (error) {
        return resp.status(500).json({msg:"Internall Service Eroor"});
    }
}

module.exports=RemoveUser;