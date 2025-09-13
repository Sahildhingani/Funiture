import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Notify } from "../ContextApi/Context";
import { useContext } from "react";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

export default function StoreSection() {
  const { dark } = useContext(Notify);

  return (
    <div
      className={`w-full p-6 rounded-2xl shadow-lg transition-colors duration-300 ${
        dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Heading */}
      <div className="mb-6 text-center">
        <h2
          className={`text-2xl md:text-3xl font-bold ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Furniture store & showrooms
        </h2>
        <p
          className={`mt-2 max-w-2xl mx-auto ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Et adipiscing mattis egestas mi placerat duis congue id. Scelerisque
          integer pulvinar justo sed eget pretium ipsum id faucibus euismod.
        </p>
      </div>

      {/* Map */}
      <div className="w-full h-80 rounded-xl overflow-hidden shadow-md mb-8">
        <MapContainer
          center={[45.0703, 7.6869]} // Turin coords
          zoom={12}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[45.07, 7.65]} icon={customIcon}>
            <Popup>Showroom 1</Popup>
          </Marker>
          <Marker position={[45.08, 7.7]} icon={customIcon}>
            <Popup>Showroom 2</Popup>
          </Marker>
          <Marker position={[45.03, 7.62]} icon={customIcon}>
            <Popup>Showroom 3</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <h3
            className={`text-lg font-semibold ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Address
          </h3>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            7914 Lees Creek
          </p>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            St. Dayton, OH 45420
          </p>
        </div>
        <div>
          <h3
            className={`text-lg font-semibold ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Phone
          </h3>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            (437) 402-2459
          </p>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            (928) 630-9272
          </p>
        </div>
        <div>
          <h3
            className={`text-lg font-semibold ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            Email
          </h3>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            info@company.com
          </p>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            sales@company.com
          </p>
        </div>
      </div>
    </div>
  );
}
