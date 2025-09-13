import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import OrderCartComponent from "./OrderCartComp";
import {
  RemoveItemFromTheCart,
  IncreaseTheCount,
  DecreaseTheCount,
} from "../Redux/Slices";
import { useNavigate } from "react-router-dom";
import { Notify } from "../ContextApi/Context";

function OrderCart() {
  const UserEmail = useSelector((s) => s.User.UserEmail);
  const cartItems = useSelector((s) => s.User.UserOrderList || []);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dark } = useContext(Notify);

  const parseNumber = (value) => parseFloat(String(value).replace(/,/g, "")) || 0;

  // Increase Quantity
  const OnclickIncrement = async ({ ProductId, UserEmail }) => {
    try {
      const { status } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/IncreaseCnt`, {
        ProductId,
        UserEmail,
      });
      if (status === 200) dispatch(IncreaseTheCount({ ProductId }));
    } catch (error) {
      console.error("Increment Error:", error);
    }
  };

  // Decrease Quantity
  const OnclickDecrement = async ({ ProductId, UserEmail }) => {
    try {
      const { status } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/DecreaseCnt`, {
        ProductId,
        UserEmail,
      });
      if (status === 200) dispatch(DecreaseTheCount({ ProductId }));
    } catch (error) {
      console.error("Decrement Error:", error);
    }
  };

  // Fetch product details for items in cart and merge with Redux quantities
  const GetDataBackend = async (cartItems) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/GetOrderData`, {
        OrderList: cartItems,
      });

      if (res.status === 200) {
        const merged = res.data.map((item) => {
          const reduxItem = cartItems.find((c) => c.ProductId === item.ProductId);
          return { ...item, Quantity: reduxItem?.Quantity ?? item.Quantity ?? 1 };
        });
        setItems(merged);
      }
    } catch (error) {
      console.error("Fetch Cart Data Error:", error);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) GetDataBackend(cartItems);
    else setItems([]);
  }, [cartItems]);

  return (
    <div className={`flex flex-col lg:flex-row gap-6 p-6 min-h-screen ${dark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* Cart Items Section */}
      <div className="flex-1 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">🛒 Your Shopping Cart</h2>

        {items.length > 0 ? (
          items.map((i) => (
            <OrderCartComponent
              key={i.ProductId}
              Quantity={i.Quantity}
              ProductBrand={i.ProductBrand}
              ProductCatogery={i.ProductCatogery}
              ProductDesc={i.ProductDesc}
              ProductImage={i.ProductImage}
              ProductName={i.ProductName}
              ProductPrice={i.ProductPrice}
              ProductId={i.ProductId}
              IncreaseCnt={() =>
                OnclickIncrement({ ProductId: i.ProductId, UserEmail })
              }
              DecreaseCnt={() =>
                OnclickDecrement({ ProductId: i.ProductId, UserEmail })
              }
              dark={dark}
            />
          ))
        ) : (
          <div className={`text-center py-10 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Your cart is empty 🛍️
          </div>
        )}
      </div>

      {/* Checkout Section */}
      <div className={`w-full lg:w-80 rounded-2xl p-6 h-fit sticky top-6 self-start shadow-lg ${dark ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-300"}`}>
        <h3 className="text-xl font-semibold border-b pb-2 mb-4 border-gray-300">
          Order Summary
        </h3>

        <div className="flex flex-col">
          {items.length > 0 ? (
            <>
              {items.map((i) => {
                const qty = parseNumber(i.Quantity);
                const price = parseNumber(i.ProductPrice);
                const total = qty * price;

                return (
                  <div
                    key={i.ProductId}
                    className={`flex justify-between items-center p-4 rounded-xl mb-3 transition-shadow duration-200 ${
                      dark ? "bg-gray-700 hover:bg-gray-600 shadow-sm hover:shadow-md" : "bg-white hover:shadow-md shadow-sm"
                    }`}
                  >
                    <h2 className="font-medium">{i.ProductName}</h2>
                    <span className="text-green-500 font-semibold">Rs.{total.toLocaleString()}</span>
                  </div>
                );
              })}

              {/* Total Price */}
              <div className={`flex justify-between items-center mt-4 pt-4 border-t font-bold text-lg ${dark ? "border-gray-600" : "border-gray-200"}`}>
                <span>Total</span>
                <span>
                  Rs.
                  {items.reduce((acc, i) => {
                    const qty = parseNumber(i.Quantity);
                    const price = parseNumber(i.ProductPrice);
                    return acc + qty * price;
                  }, 0).toLocaleString()}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/Address")}
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition-colors duration-200 ${
                  dark ? "bg-green-600 hover:bg-green-500 text-gray-100" : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                Checkout
              </button>
            </>
          ) : (
            <div className={`text-center p-6 border-dashed border-2 rounded-xl ${dark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"}`}>
              No items added in the cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderCart;
