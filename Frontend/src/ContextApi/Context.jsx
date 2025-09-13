import React, { createContext, useState } from "react";

// Create the context
export const Notify = createContext();

export const NotifyContext = ({ children }) => {
  const [noti, setNoti] = useState(false);
  const [mess, setMess] = useState("");
  const [type, setType] = useState("");
  const [dark,setdark]=useState(false);
  const callNoti = ({ message, type }) => {
    setMess(message);
    setType(type);
    setNoti(true);

    // Optional: hide notification after 2 seconds
    setTimeout(() => setNoti(false), 2000);
  };
  
  function ToggleTheam() {
  setdark((prev) => !prev); 
}

  return (
    <Notify.Provider value={{ noti, mess, type, callNoti,dark,ToggleTheam }}>
      {children}
    </Notify.Provider>
  );
};
