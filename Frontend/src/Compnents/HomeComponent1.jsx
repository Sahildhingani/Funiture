import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Chair from "../images/Chairimage1.png";
import chair2 from "../images/Chairimg2.png";
import { Notify } from "../ContextApi/Context";
import { useContext } from "react";

export default function FurnitureLanding() {
  const { dark } = useContext(Notify);

  return (
    <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-[#f4fafa] text-gray-900"} min-h-screen flex items-center justify-center p-8 ml-5 mr-5 md:ml-20 md:mr-20 rounded-2xl mt-10 relative z-0`}>
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className={`${dark ? "text-gray-100" : "text-gray-900"} text-4xl md:text-5xl font-bold leading-tight`}>
            Crafted for Comfort, <br /> Designed for Life's <br /> Beautiful Moments
          </h1>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
            Discover furniture that blends timeless elegance with everyday functionality. 
            Each piece is thoughtfully designed to elevate your space and enhance your living experience.
          </p>

          {/* Benefits List */}
          <div className="space-y-2">
            {["Premium sustainable materials", "Expert craftsmanship with attention to detail", "Free shipping on orders over $299"].map((benefit, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                <span className={`${dark ? "text-gray-300" : "text-gray-700"} text-sm`}>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Contact Experts */}
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex -space-x-2">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Sarah - Design Expert"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Michael - Furniture Specialist"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="David - Interior Consultant"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <span className={`${dark ? "text-gray-100" : "text-gray-700"} font-medium block`}>Need design advice?</span>
              <span className={`${dark ? "text-gray-300" : "text-gray-500"} text-sm`}>Connect with our experts</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/shop"
            className="inline-flex items-center bg-teal-900 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-800 transition"
          >
            Explore Our Collection
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-6">
          
          {/* Wooden Chair */}
          <div className="relative rounded-2xl overflow-hidden sm:row-span-2 group">
            <img
              src={chair2}
              alt="Artisan Wooden Chair"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className={`${dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} absolute top-4 left-4 px-3 py-1 rounded-lg shadow`}>
              <p className="text-sm font-semibold">Artisan Wooden Chair</p>
              <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-xs`}>
                $199 <span className="line-through text-gray-400 ml-1">$249</span>
              </p>
            </div>
            <Link
              to="/products/wooden-chair"
              className={`${dark ? "bg-gray-800" : "bg-white"} absolute bottom-4 right-4 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition`}
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </Link>
          </div>

          {/* Premium Office Chair */}
          <div className="relative rounded-2xl overflow-hidden flex items-center justify-center group" style={{backgroundColor: dark ? "#1f2937" : "#d6f1f4"}}>
            <img src={Chair} alt="Pretium Elite Ergonomic Office Chair" className="group-hover:scale-105 transition duration-500" />
            <div className={`${dark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} absolute top-4 left-4 px-3 py-1 rounded-lg shadow`}>
              <p className="text-sm font-semibold">Ergonomic Office Chair</p>
              <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-xs`}>$130</p>
            </div>
            <Link 
              to="/products/office-chair" 
              className={`${dark ? "bg-gray-800" : "bg-white"} absolute bottom-4 right-4 p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition`}
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </Link>
          </div>

          {/* Discount Section */}
          <div className={`${dark ? "bg-teal-800 text-gray-100" : "bg-teal-900 text-white"} rounded-2xl flex flex-col items-center justify-center p-6 space-y-2`}>
            <div className="bg-white/20 p-2 rounded-full mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5 3.5h5m-9 4v.5a2 2 0 002 2h10a2 2 0 002-2v-.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Summer Sale: 25% OFF</h3>
            <p className={`${dark ? "text-gray-300" : "text-gray-200"} text-sm text-center`}>
              Limited time offer on selected items. Create your dream space for less.
            </p>
            <Link
              to="/summer-sale"
              className={`${dark ? "bg-gray-100 text-teal-900 hover:bg-gray-200" : "bg-white text-teal-900 hover:bg-gray-200"} mt-2 inline-flex items-center px-5 py-2 rounded-full font-medium transition`}
            >
              Shop the Sale
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
