import React, { useContext } from "react";
import { Heart, ShoppingCart, Minus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Notify } from "../ContextApi/Context";
import { useNavigate } from "react-router-dom"; 
import {
  AddItemInWishList,
  RemoveItemWishList,
  AddToCardItem,
} from "../Redux/Slices";
import { Link } from "react-router-dom";

function Card({
  id,
  img,
  name,
  desc,
  price,
  brand,
  removeDisplay,
  showQuantity = false,
}) {
  const { dark, callNoti } = useContext(Notify);
  const dispatch = useDispatch();
  const UserEmail = useSelector((s) => s.User.UserEmail);
  const navigate = useNavigate();

  async function AddWishList({ id, UserEmail }) {
    try {
      if (!UserEmail) {
        navigate('/Login');
        return;
      }
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/User/WishListAddItem`,
        { ProductId: id, UserEmail },{withCredentials: true}
      );
      if (data.status === 200) {
        dispatch(AddItemInWishList({ ProductId: id }));
        callNoti({
          message: `${name} added to the wish list`,
          type: "valid",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function RemoveTheItemWishList({ ProductId }) {
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/User/RemoveWishListItem`,
        { ProductId, UserEmail },{withCredentials: true}
      );
      if (data.status === 200) {
        dispatch(RemoveItemWishList({ ProductId: id }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function AddToCard({ ProductId }) {
    try {
      if (!UserEmail) {
        navigate('/Login');
        return;
      }
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/User/AddtoCard`,
        { UserEmail, ProductId },{withCredentials: true}
      );
      if (data.status === 200) {
        dispatch(AddToCardItem({ ProductId: id }));
        callNoti({
          message: `${name} added to Cart`,
          type: "valid",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`relative w-full max-w-[260px] sm:max-w-[300px] md:w-64 
      overflow-hidden rounded-lg transition duration-300 group mx-auto
      ${dark ? "bg-gray-800 border border-gray-700" : "bg-[#fdfdfb] border border-gray-300"} 
      hover:shadow-md`}>
      
      {/* Product Image */}
      <Link to={`/Shop/Card/${id}`}>
        <div className="h-40 sm:h-44 md:h-48 w-full overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ_sk39M1CQ_d53Sd1G8zfWxZ9YqIm21UXYQ&s"}
            alt={name}
          />
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => AddWishList({ id, UserEmail })}
        className={`${dark ? "bg-gray-700/80 border-gray-600" : "bg-white/90 border-gray-200"} absolute top-2 right-2 sm:top-3 sm:right-3 p-1 sm:p-1.5 border rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300`}
      >
        <Heart className={`${dark ? "text-gray-200 hover:text-red-400" : "text-gray-600 hover:text-red-500"} w-4 h-4`} />
      </button>

      {/* Remove Button */}
      {removeDisplay && (
        <button
          onClick={() => RemoveTheItemWishList({ ProductId: id })}
          className={`${dark ? "bg-gray-700/80 border-gray-600" : "bg-white/90 border-gray-200"} absolute top-2 left-2 sm:top-3 sm:left-3 p-1 sm:p-1.5 border rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300`}
        >
          <Minus className={`${dark ? "text-gray-200 hover:text-red-400" : "text-gray-600 hover:text-red-500"} w-4 h-4`} />
        </button>
      )}

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex flex-col gap-1.5">
        <h2 className={`${dark ? "text-gray-100" : "text-gray-800"} text-sm sm:text-base font-medium tracking-wide`}>
          {name || "Product Name"}
        </h2>
        <p className={`${dark ? "text-gray-300" : "text-gray-500"} text-xs sm:text-sm italic line-clamp-2`}>
          {desc || "Product description goes here."}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className={`${dark ? "text-gray-100" : "text-gray-900"} text-base sm:text-lg font-semibold`}>
            ₹{price || 123}
          </span>
          <span className={`${dark ? "text-gray-300" : "text-gray-500"} text-[10px] sm:text-xs`}>
            {brand || "Brand"}
          </span>
        </div>

        {/* Quantity Section */}
        {showQuantity && (
          <div className={`${dark ? "border-gray-600 text-gray-200" : "border-gray-200 text-gray-700"} mt-2 flex items-center justify-between border rounded-md p-2 text-xs sm:text-sm`}>
            <span>Quantity:</span>
            <div className="flex items-center gap-2">
              <button className="p-1 border rounded">-</button>
              <span>1</span>
              <button className="p-1 border rounded">+</button>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => AddToCard({ ProductId: id })}
          className={`${dark ? "border-gray-500 text-gray-200 hover:bg-gray-700 hover:text-white" : "border-gray-700 text-gray-700 hover:bg-gray-800 hover:text-white"} mt-3 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 rounded-md border text-xs sm:text-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
