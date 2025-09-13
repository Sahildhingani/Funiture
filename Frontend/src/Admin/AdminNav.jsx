import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  CreditCard,
  LogOut,
  UserCircle2,
} from "lucide-react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import getCookie from "../../Functions/getthetoken";
import axios from "axios";
import VerifyToken from "../../Functions/VerifyToken";
function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { path: "/Admin/Product", label: "Product", icon: <Package size={20} /> },
    { path: "/Admin/Order", label: "Order", icon: <ShoppingCart size={20} /> },
    { path: "/Admin/Payment", label: "Payment", icon: <CreditCard size={20} /> },
  ];

  // get the token from the cookie
  const token = getCookie("token");
  useEffect(() => {
    async function gettoken(token) {
      const data =await  VerifyToken(token);
      if(data.UserRole!="Admin"){
        navigate('/');
      }
    }
    gettoken(token);
  }, []);

  return (
    <div className="h-screen w-52 bg-gray-900 text-white flex flex-col py-6 px-3 shadow-lg">
      <h1 className="text-xl font-bold mb-6 text-center">Admin Panel</h1>

      <div className="flex flex-col gap-3 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${
                location.pathname === item.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-red-600 transition">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminNav;
