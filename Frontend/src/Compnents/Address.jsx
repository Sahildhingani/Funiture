import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import getCookie from "../../Functions/getthetoken";
import VerifyToken from "../../Functions/VerifyToken";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ClearOrderList } from "../Redux/Slices";
import { Notify } from "../ContextApi/Context";

const parseINRToNumber = (val) => {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const cleaned = String(val).replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const getOrderQty = (o) =>
  Number(o?.quantity ?? o?.qty ?? o?.Qty ?? o?.Quantity ?? o?.count ?? 1);

const getOrderProductId = (o) =>
  String(o?.productId ?? o?.ProductId ?? o?.pid ?? o?.id ?? "").trim();

function Address() {
  const navigate = useNavigate();
  const [showOrderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const token = getCookie("token");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");

  const dispatch = useDispatch();
  const UserEmail = useSelector((s) => s.User.UserEmail);
  const { dark } = useContext(Notify);

  // Handle Cash on Delivery
  async function HandleCashOnDelivery(name, email, phone, address, items) {
    const orderItems = items.map((item) => ({
      ProductId: item.ProductId || item.productId,
      ProductName: item.ProductName || item.productName,
      Quantity: item.Quantity || item.quantity,
      UnitPrice: item.unitPrice,
    }));

    const data = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/AddOrderDetail`, {
      UserEmail: email,
      UserName: name,
      UserPhone: phone,
      UserAddress: address,
      OrderDetail: orderItems,
    },{
  withCredentials: true
});

    if (data.status === 200) {
      const id = data.data._id;
      if (await UpdateUser(id) && await ClearTheOrderList(UserEmail)) {
        dispatch(ClearOrderList());
        setOrderPlaced(true);
        setTimeout(() => navigate("/OrderTracker"), 3000);
      }
    }
  }

  async function UpdateUser(id) {
    try {
      const UserData = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/GetAndUpdateUser`, {
        UserEmail,
        id,
      },{
  withCredentials: true
});
      if (UserData.status === 200) return UserData;
    } catch (error) {
      console.log(error);
    }
  }

  async function ClearTheOrderList(UserEmail) {
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/ClearOrderListOfUser`, {
        UserEmail,
      },{
  withCredentials: true
});
      if (data.status === 200) return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function GetUserDataBackend(tok) {
    try {
      const { UserEmail } = await VerifyToken(tok);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/User/UserData`, {
        params: { UserEmail },
      },{
  withCredentials: true
});
      return response.data.UserData.UserOrderes || [];
    } catch (error) {
      console.log(error);
    }
  }

  async function GetProductData(orderList) {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/GetOrderData`, {
        OrderList: orderList,
      },{
  withCredentials: true
});
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("GetProductData error:", error);
      return [];
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userOrders = await GetUserDataBackend(token);
        setOrders(userOrders);
        const productData = await GetProductData(userOrders);
        setProducts(productData);

        const byId = new Map(productData.map((p) => [String(p.ProductId).trim(), p]));

        const merged = userOrders.map((order) => {
          const pid = getOrderProductId(order);
          const qty = getOrderQty(order);
          const p = byId.get(pid);

          const unitPrice = parseINRToNumber(p?.ProductPrice);
          const total = unitPrice * qty;

          return {
            ...order,
            productId: pid,
            quantity: qty,
            productName: p?.ProductName ?? "Unknown",
            brand: p?.ProductBrand ?? "",
            category: p?.ProductCatogery ?? "",
            image: p?.ProductImage ?? "",
            unitPrice,
            totalAmount: total,
            rawProduct: p,
          };
        });

        setItems(merged);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const grandTotal = items.reduce((sum, it) => sum + (it.totalAmount || 0), 0);

  const handlePlaceOrder = () => setShowPaymentOptions(true);

  const handleConfirmOrder = async (method) => {
    alert("Only COD is Available for Now");
  };

  if (showOrderPlaced) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${dark ? "bg-gray-900" : "bg-green-50"}`}>
        <div className={`p-8 rounded-2xl shadow-xl text-center ${dark ? "bg-gray-800 text-gray-200" : "bg-white text-green-700"}`}>
          <h1 className="text-2xl font-bold">{dark ? "🎉 Order Placed Successfully!" : "🎉 Order Placed Successfully!"}</h1>
          <p className={`mt-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
            You’ll be redirected to the home page in 3 seconds…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-7xl mx-auto mt-10 px-4 lg:px-0 ${dark ? "text-gray-200" : "text-gray-900"}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Address form */}
        <div className={`rounded-2xl shadow-lg border ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <div className="px-6 py-6">
            <OrderDetails
              Name={name}
              SetName={setname}
              Email={email}
              setemail={setemail}
              phone={phone}
              setphone={setphone}
              address={address}
              setaddress={setaddress}
              dark={dark}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className={`rounded-2xl shadow-lg border flex flex-col ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <div className={`px-6 py-5 border-b rounded-t-2xl ${dark ? "border-gray-700 bg-gray-900" : "border-gray-100 bg-gray-50"}`}>
            <h2 className={`text-xl font-bold ${dark ? "text-gray-200" : "text-gray-800"}`}>Order Summary</h2>
          </div>

          <div className="px-6 py-6 flex-1 overflow-y-auto max-h-[500px]">
            {loading ? (
              <p className="animate-pulse">{dark ? "text-gray-400" : "text-gray-500"} Loading items…</p>
            ) : items.length === 0 ? (
              <p className={dark ? "text-gray-400" : "text-gray-500"}>No items in your order.</p>
            ) : (
              <div className="space-y-5">
                {items.map((item, i) => (
                  <div
                    key={`${item.productId}-${i}`}
                    className={`flex gap-4 p-4 rounded-xl border transition hover:shadow-md ${
                      dark ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {item.image && (
                      <img
                        src={item.image.startsWith("http") ? item.image : `/images/${item.image}`}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}>{item.productName}</p>
                          {(item.brand || item.category) && (
                            <p className={`text-xs mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                              {item.brand}{item.brand && item.category ? " • " : ""}{item.category}
                            </p>
                          )}
                          <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                            Qty: {item.quantity} × ₹{formatINR(item.unitPrice)}
                          </p>
                        </div>
                        <p className="font-bold text-blue-500">₹{formatINR(item.totalAmount)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={`flex justify-between items-center pt-3 text-lg font-bold border-t ${dark ? "border-gray-600 text-gray-200" : "border-gray-200 text-gray-800"}`}>
                  <span>Total</span>
                  <span className="text-blue-500">₹{formatINR(grandTotal)}</span>
                </div>
              </div>
            )}
          </div>

          <div className={`px-6 py-5 border-t rounded-b-2xl sticky bottom-0 ${dark ? "border-gray-700 bg-gray-900" : "border-gray-100 bg-gray-50"}`}>
            {!showPaymentOptions ? (
              <>
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing || loading || items.length === 0}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-semibold transition duration-200 shadow-lg ${
                    placing || loading || items.length === 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : dark
                      ? "bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-90 text-white"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white"
                  }`}
                >
                  {placing ? "Placing…" : "Place Order"}
                </button>
                <p className={`text-xs text-center mt-3 ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  🔒 Secure checkout – No charges until confirmation
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <p className={`font-semibold text-center ${dark ? "text-gray-200" : "text-gray-700"}`}>Choose Payment Method</p>
                <button
                  onClick={() => handleConfirmOrder("PhonePe")}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow"
                >
                  Pay with PhonePe
                </button>
                <button
                  onClick={() => handleConfirmOrder("Paytm")}
                  className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow"
                >
                  Pay with Paytm
                </button>
                <button
                  onClick={() => handleConfirmOrder("Google Pay")}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow"
                >
                  Pay with Google Pay
                </button>
                <button
                  onClick={() => HandleCashOnDelivery(name, email, phone, address, items)}
                  className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white font-semibold shadow"
                >
                  Cash on Delivery (COD)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
