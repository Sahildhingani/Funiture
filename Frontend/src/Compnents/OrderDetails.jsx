import React, { useState, useEffect, useContext } from "react";
import LocationPicker from "./LoactionPicker";
import { Notify } from "../ContextApi/Context";

function OrderDetails({ Name, SetName, Email, setemail, phone, setphone, address, setaddress }) {
  const [localAddress, setLocalAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const { dark } = useContext(Notify);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") SetName(value);
    else if (name === "email") setemail(value);
    else if (name === "phone") setphone(value);
    else setLocalAddress({ ...localAddress, [name]: value });
  };

  useEffect(() => {
    if (localAddress.street || localAddress.city || localAddress.state || localAddress.zip) {
      const fullAddress = `${localAddress.street}, ${localAddress.city}, ${localAddress.state} - ${localAddress.zip}`;
      setaddress(fullAddress);
    }
  }, [localAddress, setaddress]);

  const inputBaseClasses = `mt-1 w-full border px-4 py-3 rounded-xl shadow-sm 
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition`;

  const darkInputClasses = "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400";
  const lightInputClasses = "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400";

  return (
    <div className={`flex justify-center items-center px-4 py-6 ${dark ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}>
      <div className={`p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-2xl border
        ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
      >
        <h2 className={`text-3xl font-extrabold text-center mb-2 ${dark ? "text-gray-200" : "text-gray-800"}`}>
          Delivery Details
        </h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
        <p className={`text-center mb-8 text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
          Please provide your shipping information below
        </p>

        <div className="space-y-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={Name}
                onChange={handleChange}
                required
                className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={Email}
                onChange={handleChange}
                required
                className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={handleChange}
              required
              className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
            />
          </div>

          {/* Manual Address Entry */}
          <div>
            <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>Street Address</label>
            <input
              type="text"
              name="street"
              placeholder="123 Main Street"
              value={localAddress.street}
              onChange={handleChange}
              className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={localAddress.city}
                onChange={handleChange}
                className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={localAddress.state}
                onChange={handleChange}
                className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>ZIP Code</label>
              <input
                type="text"
                name="zip"
                placeholder="PIN Code"
                value={localAddress.zip}
                onChange={handleChange}
                className={`${inputBaseClasses} ${dark ? darkInputClasses : lightInputClasses}`}
              />
            </div>
          </div>

          {/* Auto Location Picker */}
          <LocationPicker address={address} setaddress={setaddress} />

          {/* Live Address Preview */}
          {address && (
            <div className={`mt-6 p-4 border rounded-xl text-sm
              ${dark ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-200 text-gray-700"}`}
            >
              <strong>Complete Address: </strong>
              {address}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;

