const Express=require('express');
const SendEmail =require('../UserFunction/SendEmail');
const Verifythecode=require('../UserFunction/VerifyCode');
const SignUp=require('../UserFunction/SignUp');
const Login=require('../UserFunction/Login');
const verifyJWT=require('../UserFunction/VerifyJWT');
const GetWishListItems=require('../WishListFunction/GetWishListData');
const Router=Express.Router();
const Additemtowishlist=require('../WishListFunction/AddItem');
const RemoveWishItems=require('../WishListFunction/RemoveItemWishList');
const AddItemToCard=require('../CardFunction/AddTocartItems');
const userbackenddata =require('../UserFunction/GetCompleteBackendData');
const SendCartData=require('../CardFunction/GetCartItems');
const RemoveIteamFromCart=require('../CardFunction/RemoveCartIteam');
const IncreaseCnt=require('../CardFunction/IncreaseCnt');
const DecreaseCnt=require('../CardFunction/DecreaseCnt');
const SetContactInfo =require('../ConatctUsFunction/SendContactUsForm');
const UserData=require('../UserFunction/GetUser');
const AddOrderDetail=require('../OrderDetailFunctions/AddOrder');
const GetAndUpdateUserOrderPlaced = require('../UserFunction/GetAndUpdateUser');
const ClearOrderListOfUser=require('../UserFunction/ClearTheOrderListOfUser');
const PlacedOrderDetail=require('../OrderDetailFunctions/GetPlacedOrderDetail');
const HandleForgetPass=require('../UserFunction/ForgotPass');
const VerifyForgetCode=require('../UserFunction/VerifyForgetPass');
const ResetPassword=require('../UserFunction/ResetPass');
const GoogleLogin=require('../UserFunction/GoogelLogin');
const Validation=require('../UserFunction/Validation');


Router.get('/SendMail',verifyJWT,SendEmail);
Router.get('/UserData',verifyJWT,UserData);
// jwt realted work
Router.post('/VerifyCode',Verifythecode);
Router.post('/VerifyJWT',verifyJWT);
// authenticatation
Router.post('/SignUp',SignUp);
Router.post('/Login',Login); 


Router.post('/WishListAddItem',verifyJWT,Additemtowishlist);
Router.post('/GetWishList',verifyJWT,GetWishListItems);
Router.post('/RemoveWishListItem',verifyJWT,RemoveWishItems);
Router.post('/AddToCard',verifyJWT,AddItemToCard);
Router.post('/UpdateData',verifyJWT,userbackenddata);
Router.post('/GetOrderData',verifyJWT,SendCartData);
Router.post('/RemoveItemFromCart',verifyJWT,RemoveIteamFromCart);
Router.post('/IncreaseCnt',verifyJWT,IncreaseCnt);
Router.post('/DecreaseCnt',verifyJWT,DecreaseCnt);
Router.post('/SendContact',verifyJWT,SetContactInfo);

// find and update the user 
Router.post('/GetAndUpdateUser',verifyJWT,GetAndUpdateUserOrderPlaced);
Router.post('/ClearOrderListOfUser',verifyJWT,ClearOrderListOfUser);
// orderedDetail
Router.post('/AddOrderDetail',verifyJWT,AddOrderDetail);
Router.get('/PlacedOrderDetail',verifyJWT,PlacedOrderDetail);

// google router 
Router.post('/googleLogin',GoogleLogin);

Router.post('/check',Validation);

// forget password 
Router.post('/ForgetPass',HandleForgetPass);
Router.get('/ForgetCodeVerify',VerifyForgetCode);
Router.post('/ResetPassword',ResetPassword);


// Logout
Router.post("/Logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
   path: "/", 
  });
  res.status(200).json({ msg: "Logged out successfully" });
});
module.exports=Router;