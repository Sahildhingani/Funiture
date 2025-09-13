const mongoose=require('mongoose');

const OrderDetailSchema=mongoose.Schema({
    ProductId:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    Quantity:{
        type:String,
        required:true
    },
    UnitPrice:{
        type:String,
        required:true
    },
});

const OrderPlaced=mongoose.Schema({
    UserEmail:{
        type:String,
        required:true,
    },
    UserName:{
        type:String,
        required:true,
    },
    UserPhone:{
        type:String,
        required:true,
    },
    UserAddress:{
        type:String,
        required:true,
    },
    Paid:{
        type:Boolean,
        default:false,
    },
    Ordered:{
        type:Boolean,
        default:true,
    },
    Dispatch:{
        type:Boolean,
        default:false,
    },
    OutForDelivery:{
        type:Boolean,
        default:false,
    },
    Delivered:{
        type:Boolean,
        default:false,
    },
    OrderDetail:{
        type:[OrderDetailSchema],
        required:true,
    }
})

const OrderDetailMode=mongoose.model('OrderDetailModel',OrderPlaced);

module.exports=OrderDetailMode;