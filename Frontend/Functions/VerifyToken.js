import axios from "axios";

async function VerifyToken() {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_API}/User/VerifyJWT`,
      { withCredentials: true } // ✅ config object
    );

    return res.data.data; // ✅ response data
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

export default VerifyToken;
