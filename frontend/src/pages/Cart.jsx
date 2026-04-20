import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(0);
  const [invoice, setInvoice] = useState(null);

  const token = localStorage.getItem("token");

  const indianNames = [
    "Mumbai Central Kitchen",
    "Delhi Spice Hub",
    "Nagpur Food Station",
    "Pune Tiffin House",
    "Hyderabad Biryani Point",
  ];

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get(`${API}:30002/api/getcart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setItems(res.data);
        setInvoice(null);
        setStep(0);
      })
      .catch(() => toast.error("Failed to load cart ❌"));
  };

  // =======================
  // 💰 BILL CALCULATION
  // =======================
  const foodTotal = items.reduce(
    (acc, i) => acc + Number(i.price || 0) * Number(i.qty || 1),
    0
  );

  const totalItems = items.reduce(
    (acc, i) => acc + Number(i.qty || 1),
    0
  );

  // 🔥 FREE DELIVERY LOGIC
  const deliveryFee = foodTotal >= 200 ? 0 : 25;

  const foodGST = foodTotal * 0.05;
  const deliveryGST = deliveryFee * 0.18;

  const finalTotal = foodTotal + foodGST + deliveryFee + deliveryGST;

  // =======================
  // 🚚 PLACE ORDER
  // =======================
  const placeOrder = () => {
    if (items.length === 0) return;

    const snapshot = {
      foodTotal,
      foodGST,
      deliveryFee,
      deliveryGST,
      finalTotal,
    };

    axios
      .post(
        `${API}:30004/api/order`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      )
      .then(() => {
        toast.success("Order placed 🎉");

        setInvoice(snapshot);
        setItems([]);
        setStep(1);

        setTimeout(() => {
          toast.info("📦 Packing your order...");
          setStep(2);
        }, 2000);

        setTimeout(() => {
          const place =
            indianNames[Math.floor(Math.random() * indianNames.length)];
          toast.info(`🍳 Picked from ${place}`);
          setStep(3);
        }, 5000);

        setTimeout(() => {
          toast.info("🚚 Rider left station");
          setStep(4);
        }, 8000);

        setTimeout(() => {
          toast.success("🛵 Arriving in 10–20 min!");
          setStep(5);
        }, 12000);

        setTimeout(() => {
          setInvoice(null);
        }, 15000);
      })
      .catch(() => toast.error("Order failed ❌"));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <ToastContainer />

      <h1 className="text-2xl font-bold text-center mb-6">
        🛒 Your Cart
      </h1>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

        {/* CART */}
        <div className="lg:col-span-2 bg-white p-5 rounded shadow">

          {items.length === 0 ? (
            <p className="text-center text-gray-500">Cart empty</p>
          ) : (
            items.map((item, i) => (
              <div key={i} className="flex justify-between border-b py-2">
                <span>{item.name}</span>
                <span>₹{item.price} x {item.qty}</span>
              </div>
            ))
          )}

          <button
            onClick={placeOrder}
            disabled={items.length === 0}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
          >
            Place Order
          </button>
        </div>

        {/* BILL */}
        <div className="bg-white p-5 rounded shadow">

          <h2 className="font-bold mb-3">🧾 Bill Summary</h2>

          <div className="flex justify-between">
            <span>Items Total</span>
            <span>₹{foodTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Food GST (5%)</span>
            <span>₹{foodGST.toFixed(2)}</span>
          </div>

          {/* DELIVERY */}
          <div className="flex justify-between">
            <span>Delivery</span>
            <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>
              {deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Delivery GST (18%)</span>
            <span>₹{deliveryGST.toFixed(2)}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{finalTotal.toFixed(2)}</span>
          </div>

          {/* TRACKING */}
          {step > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">🚚 Live Map Tracking</h3>

              <div className="bg-gray-200 h-2 rounded overflow-hidden">
                <div
                  className="bg-green-500 h-2 transition-all duration-1000"
                  style={{ width: `${step * 25}%` }}
                />
              </div>

              <div className="text-sm mt-3 space-y-1">
                <p className={step >= 1 ? "text-green-600" : ""}>📦 Packing</p>
                <p className={step >= 2 ? "text-green-600" : ""}>🍳 Cooking</p>
                <p className={step >= 3 ? "text-green-600" : ""}>🏪 Picked</p>
                <p className={step >= 4 ? "text-green-600" : ""}>🚚 Moving</p>
                <p className={step >= 5 ? "text-green-600" : ""}>🛵 Arriving</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* INVOICE */}
      {invoice && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-4 rounded shadow border-l-4 border-green-500">

          <h3 className="font-bold text-green-600 mb-2">
            ✅ Order Invoice (Auto clearing)
          </h3>

          <div className="flex justify-between">
            <span>Food Total</span>
            <span>₹{invoice.foodTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>
            <span>₹{invoice.foodGST.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {invoice.deliveryFee === 0 ? "FREE 🎉" : `₹${invoice.deliveryFee}`}
            </span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold">
            <span>Paid</span>
            <span>₹{invoice.finalTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default Cart;