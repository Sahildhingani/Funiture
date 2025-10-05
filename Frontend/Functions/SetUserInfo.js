// SetUserInfo.js
import axios from 'axios';
import getCookie from '../Functions/getthetoken';
async function getverify() {
  try {
    const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_API}/User/VerifyJWT`,
  {}, // ✅ empty body if no data needs to be sent
  {
    withCredentials: true, // ✅ ensures cookies (like JWT token) are sent
  }
);

    // console.log('jeson verify resonse0',response.data.data); // return payload
    if(response.status==200){
      // set the data in the redux
      console.log('verify response',response.data.data); 
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default getverify;


// get the cookie and then verify it and store in reduxer 





