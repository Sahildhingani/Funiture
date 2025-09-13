import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Notify } from "../ContextApi/Context";

function OrderTrackerPage() {
  const UserEmail = useSelector((s) => s.User.UserEmail);
  const [OrderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dark } = useContext(Notify);

  async function PlacedOrderDetail(UserEmail) {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/User/PlacedOrderDetail`,
        { params: { UserEmail } }
      );
      setOrderList(res.data.data || []);
    } catch (error) {
      console.log("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (UserEmail) {
      PlacedOrderDetail(UserEmail);
    }
  }, [UserEmail]);

  const steps = ["Ordered", "Dispatched", "Out for Delivery", "Delivered"];

  return (
    <div className={`${dark ? "bg-gray-900" : "bg-gray-50"} py-4 md:py-8 px-2 sm:px-4`}>
      <h1 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center ${dark ? "text-gray-200" : "text-gray-800"}`}>
        My Orders
      </h1>

      {loading ? (
        <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>Loading...</p>
      ) : OrderList.length === 0 ? (
        <p className={`text-center ${dark ? "text-gray-400" : "text-gray-500"}`}>No orders found</p>
      ) : (
        <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
          {OrderList.map((order, idx) => {
            const total =
              order.OrderDetail?.reduce(
                (acc, item) =>
                  acc + Number(item.UnitPrice) * Number(item.Quantity),
                0
              ) || 0;

            let activeIndex = 0;
            if (order.Delivered) activeIndex = 3;
            else if (order.OutForDelivery) activeIndex = 2;
            else if (order.Dispatch) activeIndex = 1;
            else if (order.Ordered) activeIndex = 0;

            return (
              <div
                key={idx}
                className={`${dark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200"} border rounded-lg p-4 sm:p-6 shadow-sm`}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                  <h2 className={`${dark ? "text-gray-200" : "text-gray-700"} font-semibold text-base sm:text-lg`}>
                    Order #{order._id || "N/A"}
                  </h2>
                  <span className={`${dark ? "text-gray-400" : "text-gray-500"} text-xs sm:text-sm`}>
                    {order.UserName} | {order.UserPhone}
                  </span>
                </div>

                {/* Payment Method */}
                <div className={`mb-4 text-xs sm:text-sm`}>
                  <span className={`${dark ? "text-gray-200" : "text-gray-700"} font-medium`}>Payment: </span>
                  {order.Paid ? (
                    <span className="text-green-500">Paid (Online)</span>
                  ) : (
                    <span className="text-orange-500">Cash on Delivery</span>
                  )}
                </div>

                {/* Order Tracker */}
                <div className="mb-6">
                  {/* Desktop Tracker */}
                  <div className="hidden md:flex flex-wrap justify-between items-center gap-4">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2 flex-1 min-w-[80px]">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-medium
                          ${
                            index <= activeIndex
                              ? "bg-green-500 border-green-500 text-white"
                              : dark
                              ? "bg-gray-700 border-gray-600 text-gray-400"
                              : "bg-gray-200 border-gray-300 text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className={`${dark ? "text-gray-200" : "text-gray-600"} text-sm`}>{step}</div>
                        {index < steps.length - 1 && (
                          <div
                            className={`flex-1 h-0.5 ${
                              index < activeIndex ? "bg-green-500" : dark ? "bg-gray-600" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile Tracker */}
                  <div className="md:hidden flex flex-col space-y-4">
                    {steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border-2 text-xs font-medium mt-0.5
                          ${
                            index <= activeIndex
                              ? "bg-green-500 border-green-500 text-white"
                              : dark
                              ? "bg-gray-700 border-gray-600 text-gray-400"
                              : "bg-gray-200 border-gray-300 text-gray-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <div className={`text-sm font-medium ${index <= activeIndex ? "text-green-500" : dark ? "text-gray-400" : "text-gray-500"}`}>
                            {step}
                          </div>
                          {index === activeIndex && (
                            <div className="text-xs text-green-500 mt-1">
                              {index === 3 ? "Completed" : "In progress"}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products Table - Desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className={`w-full text-sm border table-auto ${dark ? "text-gray-200 border-gray-600" : ""}`}>
                    <thead>
                      <tr className={`${dark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-700"} text-left`}>
                        <th className="p-2 border">Product</th>
                        <th className="p-2 border">Quantity</th>
                        <th className="p-2 border">Unit Price</th>
                        <th className="p-2 border">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.OrderDetail?.map((item) => (
                        <tr key={item._id} className={`${dark ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                          <td className="p-2 border">{item.ProductName || "N/A"}</td>
                          <td className="p-2 border">{item.Quantity}</td>
                          <td className="p-2 border">₹{item.UnitPrice}</td>
                          <td className="p-2 border">₹{Number(item.UnitPrice) * Number(item.Quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Product List */}
                <div className="md:hidden space-y-3">
                  {order.OrderDetail?.map((item) => (
                    <div key={item._id} className={`${dark ? "bg-gray-700 text-gray-200" : "bg-gray-50"} border rounded p-3`}>
                      <div className="font-medium text-sm">{item.ProductName || "N/A"}</div>
                      <div className="flex justify-between text-xs mt-2">
                        <span>Qty: {item.Quantity}</span>
                        <span>₹{item.UnitPrice} each</span>
                      </div>
                      <div className="text-right text-sm font-medium mt-1">
                        ₹{Number(item.UnitPrice) * Number(item.Quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-end mt-4">
                  <p className={`font-semibold text-sm sm:text-base ${dark ? "text-gray-200" : "text-gray-800"}`}>
                    Total: ₹{total}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OrderTrackerPage;
