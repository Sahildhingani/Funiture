import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Notify } from "../ContextApi/Context";

function HomeCategory() {
  const { dark } = useContext(Notify);

  const textClass = dark
    ? "text-gray-100 hover:text-green-400 transition-colors duration-200"
    : "text-gray-800 hover:text-green-600 transition-colors duration-200";

  const categories = [
    { name: "Chair", icon: "https://cdn-icons-png.flaticon.com/512/115/115352.png", link: "/Chair" },
    { name: "Storage", icon: "https://cdn-icons-png.flaticon.com/512/160/160711.png", link: "/Storage" },
    { name: "Sofa", icon: "https://cdn-icons-png.flaticon.com/512/333/333493.png", link: "/Sofa" },
    { name: "Beds", icon: "https://cdn-icons-png.flaticon.com/512/3030/3030336.png", link: "/Bed" },
    { name: "Tables", icon: "https://cdn-icons-png.flaticon.com/512/15974/15974386.png", link: "/Tables" },
    { name: "Decore", icon: "https://cdn-icons-png.flaticon.com/512/5970/5970969.png", link: "/Decore" },
  ];

  return (
    <div className="lg:flex justify-center items-center mt-5 hidden">
      <div className="flex gap-8">
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.link}>
            <div className="flex gap-2 items-center">
              {/* Background circle for dark mode */}
              <div className={`p-1 rounded-full ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
                <img
                  className="h-6 w-6"
                  src={cat.icon}
                  alt={cat.name}
                  style={dark ? { filter: "brightness(0) invert(1)" } : {}}
                />
              </div>
              <h1 className={`font-medium ${textClass}`}>{cat.name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeCategory;

