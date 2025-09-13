const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
    ProductId:{
        type:String,
        required:true,
    },
    ProductName:{
        type:String,
        required:true,
    },
    ProductDesc:{
        type:String,
        required:true,
    },
    ProductImage:{
        type:String,
    },
    ProductPrice:{
        type:String,
        required:true,
    },
    ProductCatogery:{
        type:String,  
    },
    ProductBrand:{
       type:String,
    },
    ProductTags:[String],
    TopRated:{type:Boolean , default:false },
    MostSelling:{type:Boolean, default:false},
});

const ProductModel=mongoose.model("ProductModel",ProductSchema);

module.exports=ProductModel;