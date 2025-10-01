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


Router.get('/SendMail',SendEmail);
Router.get('/UserData',UserData);
// jwt realted work
Router.post('/VerifyCode',Verifythecode);
Router.post('/VerifyJWT',verifyJWT);
// authenticatation
Router.post('/SignUp',SignUp); // working checked 
Router.post('/Login',Login); // checked Working


Router.post('/WishListAddItem',Additemtowishlist);
Router.post('/GetWishList',GetWishListItems);
Router.post('/RemoveWishListItem',RemoveWishItems);
Router.post('/AddToCard',AddItemToCard);
Router.post('/UpdateData',userbackenddata);
Router.post('/GetOrderData',SendCartData);
Router.post('/RemoveItemFromCart',RemoveIteamFromCart);
Router.post('/IncreaseCnt',IncreaseCnt);
Router.post('/DecreaseCnt',DecreaseCnt);
Router.post('/SendContact',SetContactInfo);

// find and update the user 
Router.post('/GetAndUpdateUser',GetAndUpdateUserOrderPlaced);
Router.post('/ClearOrderListOfUser',ClearOrderListOfUser);
// orderedDetail
Router.post('/AddOrderDetail',AddOrderDetail);
Router.get('/PlacedOrderDetail',PlacedOrderDetail);

// google router 
Router.post('/googleLogin',GoogleLogin);

Router.post('/check',Validation);

// forget password 
Router.post('/ForgetPass',HandleForgetPass);
Router.get('/ForgetCodeVerify',VerifyForgetCode);
Router.post('/ResetPassword',ResetPassword);
module.exports=Router;