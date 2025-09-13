import React from "react";

const rooms = [
  {
    name: "Living Room",
    products: 15,
    img: "https://www.marthastewart.com/thmb/9Pa_KJYx2q7iHe8xE1VKe2MGKwo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ms-cozy-living-room-ideas-heidi-harris-d20b6776355843cea943bafdd6a94f44.jpg",
  },
  {
    name: "Bedroom",
    products: 24,
    img: "https://images.woodenstreet.de/image/data%2FLooks%2F3.jpg",
  },
  {
    name: "Walk-in Closet",
    products: 30,
    img: "https://images.unsplash.com/photo-1708397016786-8916880649b8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsayUyMGluJTIwY2xvc2V0fGVufDB8fDB8fHww",
  },
  {
    name: "Kitchen",
    products: 24,
    img: "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function BrowseByRooms() {
  return (
    <div className="bg-[#0f2a24] text-white rounded-3xl p-8 mt-15">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2">Browse by rooms</h2>
        <p className="text-gray-300 mb-6 max-w-2xl">
          Sit massa etiam urna id. Non pulvinar aenean ultrices lectus vitae
          imperdiet vulputate a eu. Aliquet ullamcorper leo mi vel sit pretium
          euismod eget.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Big Living Room */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group h-[500px]">
            <img
              src={rooms[0].img}
              alt={rooms[0].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 rounded-lg shadow-md">
              <h3 className="font-semibold">{rooms[0].name}</h3>
              <p className="text-sm text-gray-600">
                {rooms[0].products} products
              </p>
            </div>
          </div>

          {/* Bedroom */}
          <div className="relative rounded-2xl overflow-hidden group h-[240px]">
            <img
              src={rooms[1].img}
              alt={rooms[1].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 rounded-lg shadow-md">
              <h3 className="font-semibold">{rooms[1].name}</h3>
              <p className="text-sm text-gray-600">
                {rooms[1].products} products
              </p>
            </div>
          </div>

          {/* Walk-in Closet */}
          <div className="relative rounded-2xl overflow-hidden group h-[240px]">
            <img
              src={rooms[2].img}
              alt={rooms[2].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 rounded-lg shadow-md">
              <h3 className="font-semibold">{rooms[2].name}</h3>
              <p className="text-sm text-gray-600">
                {rooms[2].products} products
              </p>
            </div>
          </div>

          {/* Kitchen */}
          <div className="relative rounded-2xl overflow-hidden group h-[240px] md:col-span-3">
            <img
              src={rooms[3].img}
              alt={rooms[3].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 rounded-lg shadow-md">
              <h3 className="font-semibold">{rooms[3].name}</h3>
              <p className="text-sm text-gray-600">
                {rooms[3].products} products
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

