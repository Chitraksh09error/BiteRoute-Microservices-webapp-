import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Food() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const [showCelebration, setShowCelebration] = useState(false);
  const [prevTotal, setPrevTotal] = useState(0);

  // ⭐ NEW: animated progress bar state
  const [animatedWidth, setAnimatedWidth] = useState(0);

  const navigate = useNavigate();
  const FREE_DELIVERY_THRESHOLD = 200;

  const getRating = (id) => {
    const seed = id.charCodeAt(0);
    return (3.8 + (seed % 10) * 0.1).toFixed(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully ✅");
    navigate("/");
  };

  // 😂 CATEGORY JOKES
  const categoryJokes = {
    fastfood: "Fast food: because waiting is harder than dieting 🍔",
    indian: "Indian food: where spices hit harder than your exams 🌶🔥",
    chinese: "Chinese food: 5 mins cooking, 5 hours craving 🍜",
    dessert: "Desserts don’t ask questions, they understand 🍰",
    drinks: "Sip happens... stay hydrated 🥤😎",
    snacks: "Snacks before meals? Always. Snacks after meals? Also yes 😏",
    breakfast: "Breakfast: the only meal that forgives yesterday's mistakes ☀️",
  };

  useEffect(() => {
    axios
      .get(`${API}:30003/api/foods`)
      .then((res) => setFoods(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchCart = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API}:30002/api/getcart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        const map = {};
        let totalCount = 0;
        let totalPrice = 0;

        res.data.forEach((item) => {
          map[item.foodId] = item.qty;
          totalCount += item.qty;
          totalPrice += item.price * item.qty;
        });

        setCartItems(map);
        setCartCount(totalCount);
        setCartTotal(totalPrice);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🎯 SMOOTH PROGRESS BAR FIX (IMPORTANT)
  useEffect(() => {
    const percentage = Math.min(
      (cartTotal / FREE_DELIVERY_THRESHOLD) * 100,
      100
    );

    const timer = setTimeout(() => {
      setAnimatedWidth(percentage);
    }, 50);

    return () => clearTimeout(timer);
  }, [cartTotal]);

  // 🎆 FIREWORK TRIGGER
  useEffect(() => {
    if (
      prevTotal < FREE_DELIVERY_THRESHOLD &&
      cartTotal >= FREE_DELIVERY_THRESHOLD
    ) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    }
    setPrevTotal(cartTotal);
  }, [cartTotal]);

  const updateCart = (item, action) => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${API}:30002/api/cart`,
        { item, action },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        const map = {};
        let total = 0;
        let totalPrice = 0;

        res.data.forEach((i) => {
          map[i.foodId] = i.qty;
          total += i.qty;
          totalPrice += i.price * i.qty;
        });

        setCartItems(map);
        setCartCount(total);
        setCartTotal(totalPrice);
      });
  };

  const remaining = FREE_DELIVERY_THRESHOLD - cartTotal;

  const groupedFoods = foods.reduce((acc, item) => {
    const cat = item.category || "others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">

      {/* 🎆 FIREWORK (UNCHANGED) */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">

          {[...Array(10)].map((_, i) => {
            const angle = Math.random() * 40 + 20;
            const distance = Math.random() * 400 + 200;

            return (
              <span
                key={"l" + i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: ["#22c55e", "#eab308", "#0ea5e9", "#ef4444"][i % 4],
                  left: "0%",
                  top: "60%",
                  animation: "leftArc 1s ease-out forwards",
                  "--dx": `${distance}px`,
                  "--dy": `-${distance * Math.tan(angle * (Math.PI / 180))}px`,
                }}
              />
            );
          })}

          {[...Array(10)].map((_, i) => {
            const angle = Math.random() * 40 + 20;
            const distance = Math.random() * 400 + 200;

            return (
              <span
                key={"r" + i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: ["#22c55e", "#eab308", "#0ea5e9", "#ef4444"][i % 4],
                  right: "0%",
                  top: "60%",
                  animation: "rightArc 1s ease-out forwards",
                  "--dx": `${distance}px`,
                  "--dy": `-${distance * Math.tan(angle * (Math.PI / 180))}px`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* HEADER */}
      <div className="sticky top-0 bg-white shadow-sm z-50 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">🍽 Food Menu</h1>

        <div className="flex gap-2">
          <Link to="/orders">
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Orders
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CATEGORY UI */}
      <div className="max-w-6xl mx-auto p-4 space-y-10">

        {Object.keys(groupedFoods).map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-bold capitalize mb-1">
              {category}
            </h2>

            <p className="text-sm text-gray-500 mb-4 italic">
              {categoryJokes[category]}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedFoods[category].map((f) => (
                <div key={f._id} className="bg-white p-4 rounded shadow">

                  <div className="flex justify-between">
                    <h3>{f.name}</h3>
                    <span className="text-sm text-green-600">
                      ⭐ {getRating(f._id)}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm">Popular item</p>

                  <p className="mt-2 font-semibold">₹{f.price}</p>

                  <div className="mt-3 flex gap-2 items-center">
                    {cartItems[f._id] ? (
                      <>
                        <button
                          onClick={() => updateCart(f, "dec")}
                          className="bg-gray-200 w-8 h-8 rounded"
                        >
                          -
                        </button>

                        <span>{cartItems[f._id]}</span>

                        <button
                          onClick={() => updateCart(f, "inc")}
                          className="bg-green-500 text-white w-8 h-8 rounded"
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => updateCart(f, "inc")}
                        className="bg-orange-500 text-white px-3 py-1 rounded"
                      >
                        Add
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* DELIVERY BAR (SMOOTH FIXED) */}
      {cartCount > 0 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-gray-900 text-white p-3 rounded shadow">

          <div className="flex justify-between text-sm">
            <span>
              {remaining > 0
                ? `Add ₹${remaining} for free delivery`
                : "Free delivery unlocked 🎉"}
            </span>

            <span className="text-green-400">₹{cartTotal}</span>
          </div>

          <div className="mt-1 bg-gray-700 h-2 rounded">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded transition-all duration-700 ease-out shadow-inner"
              style={{ width: `${animatedWidth}%` }}
            />
          </div>

        </div>
      )}

      {/* CART BUTTON */}
      <div className="fixed bottom-4 right-4">
        <Link to="/cart">
          <button className="bg-black text-white px-4 py-2 rounded">
            🛒 ₹{cartTotal} ({cartCount})
          </button>
        </Link>
      </div>

    </div>
  );
}

export default Food;