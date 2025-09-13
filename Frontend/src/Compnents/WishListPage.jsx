import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../Compnents/ProductCard";
import { X } from "lucide-react"; // cross icon
import { useSelector } from "react-redux";
import { Notify } from "../ContextApi/Context";

function WishList({ close, setclose }) {
  const handleClose = () => setclose(false);
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(true);

  // Get wishlist ids from Redux
  const state = useSelector((s) => s.User.UserWishList);

  const { dark } = useContext(Notify);

  // Fetch detailed wishlist items from backend
  async function GetWishListBackend({ state }) {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/GetWishList`, {
        WishListData: state,
      });
      if (data.status === 200) {
        setitems(data.data);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetWishListBackend({ state });
  }, [state]);

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 z-50 flex flex-col transition-all ${
        dark
          ? "bg-gray-900 text-gray-200 shadow-gray-700"
          : "bg-white text-gray-900 shadow-gray-300"
      }`}
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center p-4 border-b ${
          dark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <h2 className="font-bold text-lg">Your Wishlist</h2>
        <button
          onClick={handleClose}
          className={`${
            dark
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <p
            className={`text-center ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Loading...
          </p>
        ) : items.length === 0 ? (
          <p
            className={`text-center ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No items in your wishlist
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <Card
                key={item.ProductId}
                id={item.ProductId}
                img={item.ProductImage}
                name={item.ProductName}
                desc={item.ProductDesc}
                price={item.ProductPrice}
                brand={item.ProductBrand}
                removeDisplay={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
