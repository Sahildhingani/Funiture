import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Product from './Admin/Product.jsx'
import App from './App.jsx'
import Admin from './Admin/Admin.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Compnents/Home.jsx'
import Storage from './IndividualComponents/StorageComponent.jsx'
import Chair from './IndividualComponents/ChairComponent.jsx'
import Bed from './IndividualComponents/Bed.jsx'
import Decore from './IndividualComponents/Decore.jsx'
import Sofa from './IndividualComponents/Sofa.jsx'
import Table from './IndividualComponents/Table.jsx'
import Login from './Compnents/LoginPage.jsx'
import Signup from './Compnents/SignUp.jsx'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Store from './Redux/Store.js'
import WishList from './Compnents/WishListPage.jsx'
import OrderCart from './Compnents/OrderCart.jsx'
import ContactUs from './Compnents/ContactUs.jsx'
import AboutUs from './Compnents/AboutUs.jsx'
import ComingSoon from './Compnents/CommingSoon.jsx'
import Address from './Compnents/Address.jsx'
import OrderTrackerPage from '../src/Compnents/OrderTrackerPage.jsx'
import AdminOrderList from './Admin/Orders.jsx'
import Shop from './Compnents/Shop.jsx'
import CardIndividualComponent from './Compnents/CardIndividualPage.jsx'
import { NotifyContext } from "../src/ContextApi/Context.jsx";
import UserNotification from './Compnents/UserNotification.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/Chair',
        element:<Chair/>
      },
      {
        path:'/Storage',
        element:<Storage/>
      },
      {
        path:'/Bed',
        element:<Bed/>
      },
      {
        path:'/Decore',
        element:<Decore/>
      },
      {
        path:'/Sofa',
        element:<Sofa/>
      },
      {
        path:'/Tables',
        element:<Table/>
      },
      {
        path:'/Login',
        element:<Login/>
      },
      {
        path:'/SignUp',
        element:<Signup/>
      },
      {
        path:'/OrderItems',
        element:<OrderCart/>
      },
      {
        path:'/ContactUs',
        element:<ContactUs/>
      },
      {
        path:'/Address',
        element:<Address/>,
      },
      {
        path:'/OrderTracker',
        element:<OrderTrackerPage/>
      },
      {
        path:'/AboutUs',
        element:<AboutUs/>
      },
      {
        path:'/Shop',
        element:<Shop/>
      },{
        path:'/Shop/Card/:id',
        element:<CardIndividualComponent/>,
      },
      { path: '*', element: <ComingSoon/> },
    ]
  },{
    path:'/Admin',
    element:<Admin/>,
    children:[
      {
        path:'/Admin/Product',
        element:<Product/>
      },
      {
        path:'/Admin/Order',
        element:<AdminOrderList/>
      },
      { path: '*', element: <ComingSoon/> },
    ]
  }
])


createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Provider store={Store}>
    <NotifyContext>
      <RouterProvider router={router} />
    </NotifyContext>
    
  </Provider>
</GoogleOAuthProvider>

)
