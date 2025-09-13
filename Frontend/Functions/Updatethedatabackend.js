import axios from 'axios';

async function Updatedata({UserEmail}) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/UpdateData`, {UserEmail});
    // console.log('jeson verify resonse0',response.data.data); // return payload
    if(response.status==200){
      // set the data in the redux
      return response.data.msg;
    }
  } catch (error) {
    console.log(error);
  }
}

async function SetUserInfo(UserEmail){
  const data=await Updatedata({UserEmail});
  return data;
}

export default SetUserInfo;