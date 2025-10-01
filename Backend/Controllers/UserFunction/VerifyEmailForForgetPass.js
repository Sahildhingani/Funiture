const UserModel=require('../Model/UserModel');

async function VerifyEmailForgetPass(UserEmail) {
    try {
        const data=await UserModel.findOne({UserEmail});
        if(data){
            console.log(data);
            return data;
        }else{
            return data;
        }
        
    } catch (error) {
        return error;
    }
}

module.exports=VerifyEmailForgetPass;