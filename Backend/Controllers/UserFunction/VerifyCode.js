const CodeModel=require('../Model/CodeModel');

async function Verifythecode(req,resp) {
    try {
        const {UserEmail,UserCode}=req.body;

        const code=await CodeModel.findOne({UserEmail});

        if(code!=UserCode){
            return resp.status(400).json({msg:'Wrong Code Check Again'});
        }

        if(code==UserCode){
            return resp.status(200).json({msg:' Code is Correct'});
        }
    } catch (error) {
        return resp.status(500).json({msg:'Issue in code check ',error});
    }
}


module.exports=Verifythecode;