import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "../ContextApi/Context";

function Signup() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const navigate = useNavigate();
  const { callNoti, dark, ToggleTheam } = useContext(Notify);

  // verify the code
  async function HandleSubmit({ UserEmail, UserCode }) {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/VerifyCode`, {
        body: { UserEmail, UserCode },
      });

      if (data.status === 200) {
        setShowPopup(false);
        setIsVerified(true);
      }
    } catch (error) {
      console.log("Code verify issue ", error);
    }
  }

  // request for code
  async function handleVerifyEmail({ UserEmail }) {
    try {
      setLoadingVerify(true);
      const data = await axios.get(`${import.meta.env.VITE_BACKEND_API}/User/SendMail`, {
        params: { UserEmail },
      });
      if (data.status === 200) {
        setShowPopup(true);
      }
    } catch (error) {
      console.log("UserVerification error ", error);
    } finally {
      setLoadingVerify(false);
    }
  }

  // SignUp user
  async function SignUp({ UserEmail, UserName, UserPassword }) {
    try {
      setLoadingSignup(true);
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/SignUp`, {
        UserName,
        UserEmail,
        UserPassword,
      });

      if (data.status === 200) {
        setTimeout(() => {
          navigate("/Login");
        }, 0);
        callNoti({ message: "Signup Successful", type: "valid" });
      }
    } catch (error) {
      console.log("SignUp error", error);
    } finally {
      setLoadingSignup(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`rounded-2xl shadow-md p-10 w-full max-w-md transition-colors duration-300 ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1
          className={`text-3xl font-semibold text-center mb-6 ${
            dark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Create Account
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Full Name */}
        <div className="mb-4">
          <label
            className={`block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              dark
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-teal-500"
                : "bg-white border-gray-300 text-gray-800 focus:ring-gray-400"
            }`}
          />
        </div>

        {/* Email + Verify */}
        <div className="mb-4">
          <label
            className={`block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}
            htmlFor="email"
          >
            Email
          </label>
          <div className="flex gap-2">
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-teal-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-gray-400"
              }`}
            />
            <button
              onClick={() => handleVerifyEmail({ UserEmail: email })}
              disabled={loadingVerify}
              className="px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              {loadingVerify ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify"
              )}
            </button>
          </div>
          {isVerified && (
            <p className="text-green-500 text-sm mt-1">✅ Email Verified</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className={`block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              dark
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-teal-500"
                : "bg-white border-gray-300 text-gray-800 focus:ring-gray-400"
            }`}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label
            className={`block mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              dark
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-teal-500"
                : "bg-white border-gray-300 text-gray-800 focus:ring-gray-400"
            }`}
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={() =>
            SignUp({ UserEmail: email, UserPassword: password, UserName: name })
          }
          disabled={!isVerified || loadingSignup}
          className={`w-full py-3 font-semibold rounded-md transition mb-4 flex items-center justify-center ${
            isVerified
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {loadingSignup ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Signup */}
        <button
          className={`w-full py-3 border rounded-md flex items-center justify-center gap-2 hover:shadow-md transition mb-4 ${
            dark
              ? "border-gray-600 text-gray-200 hover:bg-gray-700"
              : "border-gray-300 text-gray-800 hover:bg-gray-100"
          }`}
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p
          className={`text-center text-sm mt-4 ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/Login"
            className={`font-medium hover:underline ${
              dark ? "text-teal-400" : "text-gray-800"
            }`}
          >
            Login
          </Link>
        </p>
      </div>

      {/* Popup for Code */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
          <div
            className={`p-6 rounded-lg shadow-lg w-80 ${
              dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Enter Verification Code
            </h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              placeholder="6-digit code"
              className={`w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 ${
                dark
                  ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-teal-500"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-gray-400"
              }`}
            />
            <button
              onClick={() => HandleSubmit({ UserEmail: email, UserCode: code })}
              className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
