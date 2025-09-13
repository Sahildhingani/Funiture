import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "./OrderCart"; // make sure filename matches

function AdminOrderList() {
  const [OrderList, setOrderList] = useState([]);

  // Fetch orders from backend
  async function GetOrderData() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/Admin/Orderlist`, {
        withCredentials: true,
      });
      setOrderList(response.data.data); // assuming backend returns array of orders
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  }

  useEffect(() => {
    GetOrderData();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center flex-shrink-0">All Orders</h1>

      <div className="flex-1 overflow-auto">
        {OrderList.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OrderList.map((order) => (
              <OrderCard key={order._id || order.OrderId} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrderList;

