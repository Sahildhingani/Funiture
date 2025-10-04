import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import { Search, UserRoundPen, Heart, Handbag, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Settings from "./SettingCard";
import WishList from "../Compnents/WishListPage";
import { Notify } from "../ContextApi/Context";
import Notii from "../Compnents/Notification";
import SetUserInfo from "../../Functions/Updatethedatabackend";
import getCookie from "../../Functions/getthetoken";
import { useSelector, useDispatch } from "react-redux";
import { SetUserInfoComplete } from "../Redux/Slices";
import VerifyToken from "../../Functions/VerifyToken";
import axios from "axios";
import Logo from "../images/FunitureLogo.jpg";

function Nav2() {
  const { dark, noti, mess, type } = useContext(Notify);
  const location = useLocation();
  const navigate = useNavigate();
  const [SettingShow, setSettingShow] = useState(false);
  const [WishListShow, setWishList] = useState(false);
  const [MobileMenu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();

  const token = getCookie("token");

  async function GetUserDataBackend(tok) {
    const data = await VerifyToken(tok);
    const UserEmail = data.UserEmail;
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/User/UserData`, {
      params: { UserEmail },withCredentials: true
    },);
    return response.data.UserData;
  }

  useEffect(() => {
    async function getdata(token) {
      const data = await VerifyToken(token);
      const data1 = await GetUserDataBackend(token);
      dispatch(SetUserInfoComplete(data1));
    }
    if (token) getdata(token);
  }, [token]);

  const UserEmail = useSelector((s) => s.User.UserEmail);

  const handleProfileClick = () => {
    if (!UserEmail) navigate("/Login");
    else setSettingShow(!SettingShow);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await SetUserInfo(UserEmail);
      dispatch(SetUserInfoComplete(data[0]));
    };
    fetchData();
  }, [token, dispatch]);

  const HandleHeartClick = () => {
    if (!UserEmail) navigate("/Login");
    else setWishList(!WishListShow);
  };

  const HandleOrderClick = () => {
    if (!UserEmail) navigate("/Login");
    else navigate("/OrderItems");
  };

  const isActive = (path) => (location.pathname === path ? "underline" : "");

  let cnt = 0,
    cnt1 = 0;
  if (VerifyToken(token)) {
    const User = useSelector((s) => s.User);
    if (User && Object.keys(User).length > 0) {
      cnt = User.UserWishList?.length || 0;
      cnt1 = User.UserOrderList?.length || 0;
    }
  }

  // useEffect(()=>{
  //   checkValidation();
  // },[])

  // // validation request check 
  // async function checkValidation() {
  //   const data=axios.post('http://localhost:5000/User/check');
  // }

  return (
    <>
      {/* Navbar */}
      <div
        className={`flex flex-wrap justify-between items-center px-4 md:px-8 sticky top-0 z-50 py-2 shadow-sm backdrop-blur-md 
        ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        {noti && <Notii message={mess} type={type} />}

        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img className="h-12" src={Logo} alt="Furniture Logo" />
          <h1
            className={`font-semibold text-xl sm:text-2xl ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Furniture
          </h1>
        </div>

        {/* Desktop + Tablet: Links + Buttons */}
        <div className="hidden lg:flex flex-wrap items-center gap-4 flex-1 justify-end">
          <Link
            to="/"
            className={`hover:underline text-lg font-semibold ${dark ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-black"} ${isActive("/")}`}
          >
            Home
          </Link>
          <Link
            to="/Shop"
            className={`hover:underline text-lg font-semibold ${dark ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-black"} ${isActive("/Shop")}`}
          >
            Shop
          </Link>
          <Link
            to="/AboutUs"
            className={`hover:underline text-lg font-semibold ${dark ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-black"} ${isActive("/AboutUs")}`}
          >
            About Us
          </Link>
          <Link
            to="/ContactUs"
            className={`hover:underline text-lg font-semibold ${dark ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-black"} ${isActive("/ContactUs")}`}
          >
            Contact Us
          </Link>

          {/* Buttons */}
          <button
            onClick={handleProfileClick}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition duration-200
            ${dark ? "border-gray-600 text-gray-200 hover:text-blue-400 hover:border-blue-400 hover:bg-gray-800" : "border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:bg-gray-50"}`}
          >
            <UserRoundPen className="w-5 h-5" />
          </button>

          <button
            onClick={HandleHeartClick}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition duration-200
            ${dark ? "border-gray-600 text-gray-200 hover:text-red-400 hover:border-red-400 hover:bg-gray-800" : "border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500 hover:bg-gray-50"}`}
          >
            <Heart className="w-5 h-5" />
            {cnt > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow-md">
                {cnt}
              </span>
            )}
          </button>

          <button
            onClick={HandleOrderClick}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition duration-200 transform hover:scale-105
            ${dark ? "border-gray-600 text-gray-200 hover:text-green-400 hover:border-green-400 hover:bg-gray-800" : "border-gray-300 text-gray-600 hover:text-green-600 hover:border-green-600 hover:bg-green-50"}`}
          >
            <Handbag className="w-5 h-5" />
            {cnt1 > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full shadow-sm transition-all duration-300">
                {cnt1}
              </span>
            )}
          </button>
        </div>

        {/* Mobile + Tablet Hamburger */}
        <div className="lg:hidden">
          <button
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border shadow-sm transition duration-200
            ${dark ? "border-gray-600 text-gray-200 hover:text-purple-400 hover:border-purple-400 hover:bg-gray-800" : "border-gray-300 text-gray-600 hover:text-purple-600 hover:border-purple-600 hover:bg-gray-50"}`}
            onClick={() => setMobileMenu(!MobileMenu)}
          >
            {MobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Menu */}
      <div
        className={`fixed top-0 right-0 h-full z-40 shadow-xl w-3/4 max-w-xs p-4 flex flex-col gap-4 overflow-y-auto transition-transform duration-300 lg:hidden
        ${MobileMenu ? "translate-x-0" : "translate-x-full"}
        ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        {/* Search */}
        <div
          className={`flex items-center border-2 rounded-2xl ${dark ? "border-gray-600 bg-gray-800" : "border-gray-300"}`}
        >
          <input
            className={`pl-2 w-full h-10 rounded-l-2xl border-none outline-none ${dark ? "bg-gray-800 text-white placeholder-gray-400" : ""}`}
            type="text"
            placeholder="Search"
          />
          <Search className={dark ? "text-gray-400 mr-2" : "text-gray-300 mr-2"} />
        </div>

        {/* Main Links */}
        <Link to="/" className={`text-lg font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`} onClick={() => setMobileMenu(false)}>Home</Link>
        <Link to="/Shop" className={`text-lg font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`} onClick={() => setMobileMenu(false)}>Shop</Link>
        <Link to="/AboutUs" className={`text-lg font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`} onClick={() => setMobileMenu(false)}>About Us</Link>
        <Link to="/ContactUs" className={`text-lg font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`} onClick={() => setMobileMenu(false)}>Contact Us</Link>

        {/* Categories */}
        <div className="mt-4 border-t pt-4">
          <h2 className={`text-sm font-bold mb-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Categories
          </h2>
          <Link to="/Chair" className={`flex gap-2 items-center py-1 ${dark ? "text-gray-200" : "text-gray-600"}`} onClick={() => setMobileMenu(false)}>
            <img className="h-4" src="https://cdn-icons-png.flaticon.com/512/115/115352.png" alt="Chair" /> Chair
          </Link>
          <Link to="/Storage" className={`flex gap-2 items-center py-1 ${dark ? "text-gray-200" : "text-gray-600"}`} onClick={() => setMobileMenu(false)}>
            <img className="h-4" src="https://cdn-icons-png.flaticon.com/512/160/160711.png" alt="Storage" /> Storage
          </Link>
          <Link to="/Sofa" className={`flex gap-2 items-center py-1 ${dark ? "text-gray-200" : "text-gray-600"}`} onClick={() => setMobileMenu(false)}>
            <img className="h-6" src="https://cdn-icons-png.flaticon.com/512/333/333493.png" alt="Sofa" /> Sofa
          </Link>
          <Link to="/Bed" className={`flex gap-2 items-center py-1 ${dark ? "text-gray-200" : "text-gray-600"}`} onClick={() => setMobileMenu(false)}>
            <img className="h-6" src="https://cdn-icons-png.flaticon.com/512/3030/3030336.png" alt="Bed" /> Beds
          </Link>
          <Link to="/Tables" className={`flex gap-2 items-center py-1 ${dark ? "text-gray-200" : "text-gray-600"}`} onClick={() => setMobileMenu(false)}>
            <img className="h-6" src="https://cdn-icons-png.flaticon.com/512/15974/15974386.png" alt="Tables" /> Tables
          </Link>
          <Link to="/Decore" className={`flex gap-2 items-center py-1 ${dark ? "text-gray-200" : "text-gray-600"}`} onClick={() => setMobileMenu(false)}>
            <img className="h-6" src="https://cdn-icons-png.flaticon.com/512/5970/5970969.png" alt="Decore" /> Decore
          </Link>
        </div>

        {/* Profile / Wishlist / Cart */}
        <button onClick={handleProfileClick} className={`flex items-center gap-2 font-semibold border-t pt-2 ${dark ? "text-gray-200" : "text-gray-700"}`}>
          <UserRoundPen className="w-5 h-5" /> Profile
        </button>
        <button onClick={HandleHeartClick} className={`flex items-center gap-2 font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`}>
          <Heart className="w-5 h-5" /> Wishlist {cnt > 0 && `(${cnt})`}
        </button>
        <button onClick={HandleOrderClick} className={`flex items-center gap-2 font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`}>
          <Handbag className="w-5 h-5" /> Cart {cnt1 > 0 && `(${cnt1})`}
        </button>
      </div>

      {/* Overlays */}
      {SettingShow && (
        <div className={`fixed right-0 top-0 h-full w-80 sm:w-64 shadow-xl z-50 ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
          <Settings close={SettingShow} setclose={setSettingShow} />
        </div>
      )}

      {WishListShow && (
        <div className={`fixed right-0 top-0 h-full w-80 sm:w-64 shadow-xl z-50 ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
          <WishList close={WishListShow} setclose={setWishList} />
        </div>
      )}
    </>
  );
}

export default Nav2;
