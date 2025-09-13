import axios from "axios";

async function VerifyToken(token) {
    try {
        const data=await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/VerifyJWT`,{token});
        return data.data.data;
    } catch (error) {
        return error;
    }
}

export default VerifyToken;