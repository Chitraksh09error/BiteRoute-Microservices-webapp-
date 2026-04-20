import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}:30004/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getTotal = (items) =>
    items.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Your Orders 🍽️
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No orders found 😕
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-5 flex flex-col h-[270px]"
            >
              {/* Header */}
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Order ID</span>
                <span className="font-semibold text-gray-700">
                  #{order._id.slice(-6)}
                </span>
              </div>

              {/* Email */}
              <div className="text-sm text-gray-700 mb-3">
                📧 {order.email}
              </div>

              {/* ITEMS (SCROLLABLE SECTION) */}
              <div className="border-t border-b py-3 flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span className="truncate max-w-[60%]">
                      {item.name}
                    </span>
                    <span className="font-medium">
                      {item.qty} × ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-3 text-right font-bold text-gray-800">
                Total: ₹{getTotal(order.items)}
              </div>

              {/* Date */}
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Orders;