import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Notify } from "../ContextApi/Context";

export default function ComingSoon() {
  const { dark } = useContext(Notify);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-center px-6 transition-colors duration-300 
      ${dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
    >
      <h1
        className={`text-5xl md:text-6xl font-bold mb-4 
        ${dark ? "text-gray-100" : "text-gray-800"}`}
      >
        🚧 Coming Soon
      </h1>

      <p className={`text-lg mb-6 ${dark ? "text-gray-300" : "text-gray-600"}`}>
        We’re working hard to bring you this page. Stay tuned!
      </p>

      <Link
        to="/"
        className={`font-semibold px-6 py-3 rounded-xl transition 
        ${dark 
          ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900" 
          : "bg-yellow-500 hover:bg-yellow-600 text-black"
        }`}
      >
        Go Back Home
      </Link>
    </div>
  );
}

