import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Armchair, Sofa, BedDouble, MapPin, PhoneCall, Star, Award, Truck } from "lucide-react";
import HomeCatogery from "./HomeCatogeryLinks";
import FurnitureLanding from "./HomeComponent1";
import Card from "./ProductCard";
import MostSellingSection from "./ImageSliding";
import BrowseByRooms from "./HomeStaticPgae2";
import { Notify } from "../ContextApi/Context";

function Home() {
  const [MostSellingItems, setMostSellingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dark } = useContext(Notify);

  // get data of all the items that are bestsellers
  async function GetMostSelling() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/Admin/getitems`, {
        params: { MostSelling: true, page: 1, limit: 10 },
      },{ withCredentials: true});
      setMostSellingItems(res.data.Data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetMostSelling();
  }, []);

  return (
    <div className={`${dark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"} flex flex-col`}>
      <HomeCatogery />
      <FurnitureLanding />

      {/* Value Propositions */}
      <div className="flex justify-center my-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
          <div className={`flex flex-col items-center text-center p-6 rounded-lg shadow-sm ${dark ? "bg-gray-800" : "bg-white"}`}>
            <Truck className="w-10 h-10 text-teal-700 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
              On all orders over $299. Delivered right to your door.
            </p>
          </div>
          <div className={`flex flex-col items-center text-center p-6 rounded-lg shadow-sm ${dark ? "bg-gray-800" : "bg-white"}`}>
            <Award className="w-10 h-10 text-teal-700 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
            <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
              Crafted with premium materials built to last for years.
            </p>
          </div>
          <div className={`flex flex-col items-center text-center p-6 rounded-lg shadow-sm ${dark ? "bg-gray-800" : "bg-white"}`}>
            <Star className="w-10 h-10 text-teal-700 mb-4" />
            <h3 className="font-semibold text-lg mb-2">5-Star Support</h3>
            <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
              Our design experts are here to help you create your dream space.
            </p>
          </div>
        </div>
      </div>

      {/* Bestsellers Section */}
      <div className="flex flex-col justify-center items-center gap-6 mt-16 mb-12 px-4">
        <div className="text-center">
          <h2 className={`${dark ? "text-gray-100" : "text-gray-900"} text-3xl font-bold mb-3`}>
            Customer Favorites
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto mb-4"></div>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
            Discover our most loved pieces, curated based on customer ratings and frequent purchases. 
            These timeless selections combine style, comfort, and exceptional value.
          </p>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className={`${dark ? "text-gray-300" : "text-gray-500"} animate-pulse`}>
            Loading our premium collection...
          </div>
        </div>
      ) : (
        <MostSellingSection MostSellingItems={MostSellingItems} dark={dark} />
      )}

      {/* CTA between sections */}
      <div className={`${dark ? "bg-gray-800" : "bg-teal-50"} py-12 my-12`}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className={`${dark ? "text-gray-100" : "text-gray-900"} text-2xl font-semibold mb-4`}>
            Need Help Designing Your Space?
          </h3>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mb-6 max-w-2xl mx-auto`}>
            Our interior design consultants offer complimentary virtual consultations to help you select the perfect pieces for your home.
          </p>
          <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-full font-medium transition">
            Schedule a Free Consultation
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4">
        <BrowseByRooms dark={dark} />
      </div>

      {/* Testimonial snippet */}
      <div className={`${dark ? "bg-gray-800" : "bg-gray-50"} py-16 mt-12`}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="text-teal-600 mb-2">❝</div>
          <p className={`${dark ? "text-gray-300" : "text-gray-700"} text-xl italic mb-6 max-w-3xl mx-auto`}>
            "The quality of their furniture exceeded my expectations. The pieces not only look beautiful but are incredibly comfortable. 
            Their team helped me transform my living room into a magazine-worthy space!"
          </p>
          <div>
            <p className={`${dark ? "text-gray-100" : "text-gray-900"} font-medium`}>Sarah Johnson</p>
            <p className={`${dark ? "text-gray-400" : "text-gray-500"} text-sm`}>Interior Design Enthusiast</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
