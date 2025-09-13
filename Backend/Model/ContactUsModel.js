const mongoose=require('mongoose');


const ContactUsSchema=mongoose.Schema({
    UserName:{
        type:String,
        require:true,
    },
    UserEmail:{
        type:String,
        require:true,
    },
    UserSubject:{
        type:String,
        require:true,
    },
    UserMess:{
        type:String,
        require:true,
    },

})

const ContactUsModel=mongoose.model('ContactUsMosel',ContactUsSchema);

module.exports=ContactUsModel;