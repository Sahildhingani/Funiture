import React, { useContext, useState } from "react";
import { Notify } from "../ContextApi/Context";
import axios from "axios";
function LocationPicker({ address, setaddress }) {
  const [loading, setLoading] = useState(false);
  const { dark } = useContext(Notify);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
  `https://maps.googleapis.com/maps/api/geocode/json`,
  {
    params: {
      latlng: `${latitude},${longitude}`,
      key: import.meta.env.VITE_MAP_API_KEY
    },
    withCredentials: true // ✅ include cookies if needed
  }
);

          const data = await response.json();

          if (data.status === "OK" && data.results[0]) {
            setaddress(data.results[0].formatted_address);
          } else {
            alert("Unable to fetch address: " + data.status);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Something went wrong while fetching address");
        }

        setLoading(false);
      },
      (error) => {
        alert("Error fetching location: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <label className={`block text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>Address</label>
      <input
        type="text"
        value={address}
        readOnly
        placeholder="Click button to fetch location"
        className={`mt-1 w-full px-4 py-3 rounded-xl shadow-sm transition
          ${dark 
            ? "bg-gray-700 text-gray-200 border-gray-600 focus:bg-gray-600 focus:ring-blue-500 focus:border-blue-500" 
            : "bg-gray-50 text-gray-900 border-gray-200 focus:bg-white focus:ring-blue-500 focus:border-blue-500"}`
        }
      />

      <button
        onClick={handleGetLocation}
        disabled={loading}
        className={`mt-3 w-full py-3 rounded-xl shadow transition 
          ${dark
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-blue-600 text-white hover:bg-blue-700"}`
        }
      >
        {loading ? "Fetching Location..." : "📍 Use My Current Location"}
      </button>
    </div>
  );
}

export default LocationPicker;
