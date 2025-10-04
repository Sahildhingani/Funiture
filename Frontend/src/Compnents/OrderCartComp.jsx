import React, { useContext, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "../ContextApi/Context";
import { RemoveItemFromTheCart } from "../Redux/Slices";

function OrderCartComponent({
  ProductBrand,
  ProductCatogery,
  ProductDesc,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductId,
  Quantity,
  IncreaseCnt,
  DecreaseCnt,
}) {
  const dispatch = useDispatch();
  const [cnt, setcnt] = useState(Quantity);
  const { dark } = useContext(Notify);
  const UserEmail = useSelector((s) => s.User.UserEmail);

  // Remove item from backend & Redux
  async function RemoveItemCard({ ProductId, UserEmail }) {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/RemoveItemFromCart`, {
        ProductId,
        UserEmail,
      },{withCredentials: true});
      if (data.status === 200) {
        dispatch(RemoveItemFromTheCart({ ProductId }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`flex items-center gap-6 rounded-2xl p-4 border shadow-sm transition-all duration-300
        ${dark
          ? "bg-gray-800 border-gray-700 hover:shadow-lg"
          : "bg-white border-gray-200 hover:shadow-md"
        }`}
    >
      {/* Product Image */}
      <div
        className={`w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl border bg-gray-50
          ${dark ? "border-gray-600 bg-gray-700" : "border-gray-100 bg-gray-50"}`}
      >
        <img
          src={ProductImage}
          alt={ProductName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details + Actions */}
      <div className="flex flex-col flex-grow justify-between h-full">
        {/* Title & Meta */}
        <div>
          <h2
            className={`text-base font-semibold leading-snug transition-colors hover:text-green-600
              ${dark ? "text-gray-200" : "text-gray-800"}`}
          >
            {ProductName}
          </h2>
          <p className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {ProductBrand} • {ProductCatogery}
          </p>
          <p className={`text-xs mt-1 line-clamp-1 ${dark ? "text-gray-500" : "text-gray-400"}`}>
            {ProductDesc}
          </p>
        </div>

        {/* Bottom Row: Price + Qty + Remove */}
        <div className="flex items-center justify-between mt-3">
          {/* Price */}
          <span className={`text-lg font-bold ${dark ? "text-green-400" : "text-green-600"}`}>
            ₹{ProductPrice}
          </span>

          <div className="flex items-center gap-3">
            {/* Quantity Controls */}
            <div
              className={`flex items-center rounded-full overflow-hidden border
                ${dark ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"}`}
            >
              <button
                onClick={() => {
                  if (cnt > 1) setcnt(cnt - 1);
                  DecreaseCnt({ ProductId, UserEmail });
                }}
                className={`px-3 py-1 transition ${dark ? "text-gray-300 hover:bg-gray-600" : "text-gray-600 hover:bg-gray-200"}`}
              >
                –
              </button>
              <span className={`px-3 font-medium ${dark ? "text-gray-200" : "text-gray-700"}`}>{cnt}</span>
              <button
                onClick={() => {
                  setcnt(cnt + 1);
                  IncreaseCnt({ ProductId, UserEmail });
                }}
                className={`px-3 py-1 transition ${dark ? "text-gray-300 hover:bg-gray-600" : "text-gray-600 hover:bg-gray-200"}`}
              >
                +
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => RemoveItemCard({ ProductId, UserEmail })}
              className={`p-2 rounded-full transition
                ${dark ? "bg-red-700 text-red-300 hover:bg-red-600" : "bg-red-100 text-red-600 hover:bg-red-200"}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCartComponent;

