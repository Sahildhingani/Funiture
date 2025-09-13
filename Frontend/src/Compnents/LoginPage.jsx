import React, { useState, useContext, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "../ContextApi/Context";
import { useGoogleLogin } from "@react-oauth/google";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [step, setStep] = useState("email"); 
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { callNoti } = useContext(Notify);

  useEffect(() => {
    if (showForgot) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showForgot]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  async function HandleLogin({ UserEmail, UserPassword }) {
    try {
      if (!UserEmail || !UserPassword) {
        return setError("Please enter email and password");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/User/Login`,
        { UserEmail, UserPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        callNoti({ message: "Login Successful", type: "valid" });
        if (response.data.UserRole === "Admin") navigate("/Admin");
        else navigate("/");
      } else {
        setError("Wrong email or password");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  }


  // send the data to the backend for login 
async function GoogleLoginOrSignup({UserEmail,UserName}) {
  try {
    const data=await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/googleLogin`,{
      UserEmail,UserName
    },{withCredentials: true});
    if(data){
      navigate('/');''
      callNoti({message:"Login Successfull",type:"valid"});
    }

  } catch (error) {
    callNoti({message:"Login failed",type:"Notvalid"});
    console.log(error);
  }
}


const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token:", tokenResponse);

      // Fetch user profile from Google
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      console.log("User Info:", res.data.email);
      console.log("User Info:", res.data.name);
     // store the data in the backend
     GoogleLoginOrSignup({UserEmail:res.data.email,UserName:res.data.name});
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  // now handler just calls it
  const handleGoogleLogin = () => {
    login(); // ✅ trigger Google popup
  };

  async function HandleSendCodeclick(UserEmail) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/User/ForgetPass`,
        { UserEmail }
      );

      if (response.status === 200) {
        setStep("code"); // switch to code input step
        setTimer(40); // start 40 sec countdown
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          callNoti({ message: "Invalid Email", type: "Notvalid" });
          navigate("/Signup");
        } else {
          callNoti({ message: "Something went wrong", type: "Notvalid" });
        }
      } else {
        callNoti({ message: "Server not reachable", type: "Notvalid" });
      }
    }
  }

  async function VerifyEamilCode(UserEmail, code) {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/User/ForgetCodeVerify`,
        {
          params: { UserEmail, code },
        }
      );
      if (data.status == 200) {
        callNoti({ message: "Correct code", type: "valid" });
        setStep("reset"); // go to reset password step
      } else {
        callNoti({ message: "Wrong Code", type: "Notvalid" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function HandleResetPassword(UserEmail, newPassword) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/ResetPassword`, {
        UserEmail,
        newPassword,
      });
      if (res.status === 200) {
        callNoti({ message: "Password updated successfully", type: "valid" });
        setShowForgot(false);
        setStep("email");
        setCode("");
        setNewPassword("");
        navigate("/Login");
      } else {
        callNoti({ message: "Password reset failed", type: "Notvalid" });
      }
    } catch (err) {
      console.log(err);
      callNoti({ message: "Server error, try again", type: "Notvalid" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-sm relative z-10">
        {!showForgot ? (
          <>
            {/* Login Section */}
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
              Login
            </h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>

            <div className="mb-2 relative">
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition pr-10"
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500 mt-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            <div className="text-right mb-4">
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </button>
            </div>

            <button
              onClick={() =>
                HandleLogin({ UserEmail: email, UserPassword: password })
              }
              className="w-full py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition mb-4"
            >
              Login
            </button>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:shadow-md transition mb-4"
            >
              <FcGoogle size={24} /> Continue with Google
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/SignUp">
                <span className="text-gray-800 font-medium hover:underline cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </p>
          </>
        ) : null}
      </div>

      {/* Forgot Password Popup */}
      {showForgot && (
        <div className="fixed inset-0 flex items-center justify-center z-30 px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowForgot(false);
                setStep("email");
                setCode("");
                setNewPassword("");
              }}
            >
              ✕
            </button>

            {step === "email" && (
              <>
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                  Forgot Password
                </h1>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Enter your registered email to receive a reset code.
                </p>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition mb-4"
                />
                <button
                  onClick={() =>
                    HandleSendCodeclick({ UserEmail: forgotEmail })
                  }
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                  Send Code
                </button>
              </>
            )}

            {step === "code" && (
              <>
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                  Enter Verification Code
                </h1>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Enter the 6-digit code sent to your email.
                </p>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full tracking-widest text-center p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition mb-4"
                />
                <button
                  onClick={() => VerifyEamilCode(forgotEmail, code)}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition mb-4"
                >
                  Verify Code
                </button>
                <button
                  disabled={timer > 0}
                  onClick={() =>
                    HandleSendCodeclick({ UserEmail: forgotEmail })
                  }
                  className={`w-full py-3 rounded-md font-semibold transition ${
                    timer > 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
                </button>
              </>
            )}

            {step === "reset" && (
              <>
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                  Reset Password
                </h1>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Enter your new password for <b>{forgotEmail}</b>.
                </p>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition mb-4"
                />
                <button
                  onClick={() => HandleResetPassword(forgotEmail, newPassword)}
                  className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
                >
                  Update Password
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
