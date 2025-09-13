import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

function Notii({ message, type }) {
  const isValid = type === "valid";
  return (
    <div
      className={`fixed top-5 right-5 flex items-center p-4 rounded-lg shadow-lg transition-all z-[9999]
        ${isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
    >
      {isValid ? (
        <CheckCircle className="w-6 h-6 mr-2" />
      ) : (
        <XCircle className="w-6 h-6 mr-2" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

export default Notii;

