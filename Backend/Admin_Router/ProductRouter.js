const express=require('express');
const AddItems=require('../Admin_Function/AddItems');
const DeleteItems=require('../Admin_Function/DeleteProduct');
const GetItems=require('../Admin_Function/GetItems');
const UpdateItem=require('../Admin_Function/UpdateItemData');
const OrderList=require('../Admin_Function/GetOrderList');
const ToggleOrderStatus=require('../Admin_Function/UpdateOrderList');
const GetIndividualItem=require('../Admin_Function/GetIndividualProductData');
const router=express.Router();

// Add product to data base 
router.post('/Add',AddItems);

// remove product from the data base 
router.delete('/remove',DeleteItems); // working fine

// update the product from the database

router.post('/Update',UpdateItem); // working fine 

// get data based on condition 

router.get('/getitems',GetItems);  // get items according to the need 

router.get('/GetIndividualItem',GetIndividualItem)

// get order list of the users 
router.get('/Orderlist',OrderList);
router.post('/ToggleOrderStatus',ToggleOrderStatus);

module.exports=router;