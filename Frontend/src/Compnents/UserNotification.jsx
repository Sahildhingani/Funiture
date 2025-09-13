import React, { useContext } from "react";
import { Bell, X } from "lucide-react";
import { motion } from "framer-motion";
import { Notify } from "../ContextApi/Context";

function UserNotification({ onClose }) {
  const { dark } = useContext(Notify);

  // Example notifications array
  const notifications = []; // keep empty to show "No notifications"

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 w-80 h-full flex flex-col shadow-2xl border-l z-50
        ${dark ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"}
      `}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center px-5 py-4 border-b 
          ${dark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"}
        `}
      >
        <h1 className="font-semibold text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" /> Notifications
        </h1>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close notifications"
        >
          <X size={22} />
        </button>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto px-5 py-6 text-sm space-y-3">
        {notifications.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-center">
            No notifications 📭
          </div>
        ) : (
          notifications.map((note, index) => (
            <div
              key={index}
              className={`${
                dark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"
              } p-3 rounded-lg`}
            >
              {note}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default UserNotification;


