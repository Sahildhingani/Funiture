import React, { useContext } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Notify } from "../ContextApi/Context";

function AccountSetting({ onClose }) {
  const { dark } = useContext(Notify);

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
        <h1 className="font-semibold text-lg">👤 Account Settings</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close account settings"
        >
          <X size={22} />
        </button>
      </div>

      {/* Empty Content */}
      <div className="flex-1 p-5 text-sm flex items-center justify-center">
        <p className="text-gray-400 italic">No settings available yet.</p>
      </div>
    </motion.div>
  );
}

export default AccountSetting;

