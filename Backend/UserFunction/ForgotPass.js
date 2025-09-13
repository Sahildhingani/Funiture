const VerifyEmailForgetPass=require('../UserFunction/VerifyEmailForForgetPass');
const ForgetPassModel=require('../Model/ForgetPassCode');
const sendEmail=require('../UserFunction/NodeMailer');
// genertae the six digit code 
function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000); // ensures 6 digits
}


// set the six digit code in the backend 

async function SetCodeInBackend(UserEmail,Code) {
    try {
        const resp=await ForgetPassModel.create({UserEmail,Code});
        if(resp){
            return resp;
        }
    } catch (error) {
        return error;
    }
}

async function HandleForgetPass(req,resp) {
    try {
        const email=req.body.UserEmail.UserEmail;
        console.log(email);
        // verify first
        const respo=await VerifyEmailForgetPass(email);
        if(respo){
            const Code=generateSixDigitCode();
            // set the code in the backend 
            const data=await SetCodeInBackend(email,Code); 
            
            if(data){
                // send the data to the email of the user 
                sendEmail(email,"Forget Password Code ", `Your verification code is: ${Code}\n\nThis code will expire in 40 seconds.`);
                return resp.status(200).json({msg:"mail sent to your email "});
            }
        }else{
            return resp.status(400).json({msg:'Invalid Email'});
        }   
    } catch (error) {
        return resp.status(500).json({msg:"error"});
    }
}

module.exports= HandleForgetPass;