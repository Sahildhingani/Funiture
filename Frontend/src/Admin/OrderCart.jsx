import React, { useState } from "react";
import axios from "axios";

function OrderCard({ order }) {
  const [delivered, setDelivered] = useState(order.Delivered);
  const [dispatch, setDispatch] = useState(order.Dispatch);
  const [outForDelivery, setOutForDelivery] = useState(order.OutForDelivery);
  const [ordered, setOrdered] = useState(order.Ordered);
  const [paid, setPaid] = useState(order.Paid);

  const statuses = [
    { label: "Ordered", state: ordered, setState: setOrdered },
    { label: "Paid", state: paid, setState: setPaid },
    { label: "Dispatch", state: dispatch, setState: setDispatch },
    { label: "Out For Delivery", state: outForDelivery, setState: setOutForDelivery },
    { label: "Delivered", state: delivered, setState: setDelivered },
  ];

  // Function to toggle status in backend
  const toggleStatus = async (field, currentState, setState) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/Admin/ToggleOrderStatus`, {
        _id: order._id,
        field,
      });
      if (response.status === 200) {
        // Flip the local state only if backend succeeded
        setState(!currentState);
      }
    } catch (err) {
      console.error(`Failed to toggle ${field}:`, err);
    }
  };

  // ✅ Calculate total price
  const total = order.OrderDetail.reduce(
    (sum, item) => sum + item.UnitPrice * item.Quantity,
    0
  );

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* User Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">{order.UserName}</h2>
        <p className="text-gray-600">{order.UserEmail}</p>
        <p className="text-gray-600">{order.UserPhone}</p>
        <p className="text-gray-500 mt-1">{order.UserAddress}</p>
      </div>

      {/* Product List */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-800">Products:</h3>
        <ul className="space-y-2">
          {order.OrderDetail.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="font-medium">
                {item.ProductName} x {item.Quantity}
              </span>
              <span className="font-semibold text-gray-700">
                ₹{item.UnitPrice * item.Quantity}
              </span>
            </li>
          ))}
        </ul>

        {/* ✅ Total Section */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t text-lg font-bold text-gray-900">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Status Toggles */}
      <div className="flex flex-wrap gap-4 mt-4">
        {statuses.map(({ label, state, setState }) => (
          <div
            key={label}
            className="flex items-center justify-between bg-gray-100 rounded-xl p-3 flex-1 min-w-[140px] shadow-sm"
          >
            <span className="text-gray-800 font-medium">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={state}
                onChange={() => toggleStatus(label, state, setState)}
                className="sr-only"
              />
              <div
                className={`w-14 h-7 rounded-full transition-colors ${
                  state ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  state ? "translate-x-7" : ""
                }`}
              ></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;

