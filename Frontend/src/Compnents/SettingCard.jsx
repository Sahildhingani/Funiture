import React, { useContext, useEffect, useState } from "react";
import {
  X,
  LogOut,
  Bell,
  Moon,
  Settings as Cog,
  User,
  ShoppingBag,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Notify } from "../ContextApi/Context";
import UserNotification from "./UserNotification";
import AccountSetting from "./AccountSetting";

function Settings({ close, setclose }) {
  const UserName = useSelector((s) => s.User.UserName);
  const UserEmail = useSelector((s) => s.User.UserEmail);
  const navigate = useNavigate();

  const { dark, ToggleTheam } = useContext(Notify);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  function Logout() {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    localStorage.removeItem("UserEmail");
    window.location.href = "/";
  }

  useEffect(() => {
    if (!UserEmail) {
      navigate("/Login");
    }
  }, [UserEmail, navigate]);

  const settingsItems = [
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      action: () => setShowNotifications(true),
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Orders",
      link: "/OrderTracker",
    },
    {
      icon: <Cog size={20} />,
      label: "Account Settings",
      action: () => setShowAccountSettings(true),
    },
  ];

  return (
    <>
      {/* Main settings drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 w-80 h-full flex flex-col shadow-2xl border-l transition-colors z-40
          ${dark ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"}
        `}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-5 py-4 border-b 
            ${dark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"}
          `}
        >
          <h1 className="font-semibold text-lg flex items-center gap-2">
            ⚙️ Settings
          </h1>
          <button
            onClick={() => setclose(!close)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close settings"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg mb-3 text-xl font-bold">
              {UserName ? UserName[0] : <User size={32} />}
            </div>
            <h2
              className={`font-bold text-base ${
                dark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {UserName || "Guest User"}
            </h2>
            <p
              className={`${dark ? "text-gray-400" : "text-gray-500"} text-xs`}
            >
              {UserEmail || "example@email.com"}
            </p>
          </div>

          {/* Settings List */}
          <div className="flex flex-col gap-3">
            {settingsItems.map((item, idx) => {
              const Wrapper = item.link ? Link : "div";
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={item.action}
                >
                  <Wrapper
                    to={item.link || "#"}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all shadow-sm cursor-pointer
                      ${
                        dark
                          ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          dark ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <span className="text-gray-400">›</span>
                  </Wrapper>
                </motion.div>
              );
            })}

            {/* Dark Mode Toggle */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all shadow-sm
                  ${
                    dark
                      ? "bg-gray-800 text-gray-200"
                      : "bg-gray-50 text-gray-700"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      dark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <Moon size={20} />
                  </div>
                  <span className="font-medium text-sm">Dark Mode</span>
                </div>
                <button
                  onClick={ToggleTheam}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    dark ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      dark ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-5 border-t ${
            dark ? "bg-gray-800 border-gray-700" : "bg-gray-50"
          }`}
        >
          <button
            onClick={Logout}
            aria-label="Logout"
            className="flex items-center gap-2 w-full justify-center px-5 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all shadow"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.div>

      {/* Notifications Drawer */}
      {showNotifications && (
        <UserNotification onClose={() => setShowNotifications(false)} />
      )}

      {/* Account Settings Drawer */}
      {showAccountSettings && (
        <AccountSetting onClose={() => setShowAccountSettings(false)} />
      )}
    </>
  );
}

export default Settings;

