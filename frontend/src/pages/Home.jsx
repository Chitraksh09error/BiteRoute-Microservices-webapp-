import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const isLoggedIn = !!token;

  const [showProfile, setShowProfile] = React.useState(false);
  const [jokeIndex, setJokeIndex] = React.useState(0);

  const jokes = [
    "🍕 Life is too short for bad pizza",
    "🍔 Burger first, problems later",
    "🍟 Fries before worries 😭",
    "🍜 Noodles = instant happiness",
    "🌶 Indian food hits harder than exams",
    "🍰 Dessert fixes everything",
    "☕ Coffee = survival fuel",
    "🍗 Chicken understands you better than people",
    "🥤 Sip happens, stay hydrated",
    "🍕 One slice is never enough",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setJokeIndex((prev) => (prev + 1) % jokes.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setShowProfile(false);

    toast.success("Logged out successfully ✅");
    navigate("/");
  };

  React.useEffect(() => {
    const handleClick = () => setShowProfile(false);

    if (showProfile) window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, [showProfile]);

  return (
    <div className="min-h-screen bg-[#f7f7fb] text-gray-800">

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

          <h1 className="text-xl md:text-2xl font-bold text-orange-500">
            🍽 BiteRoute
          </h1>

          <div className="flex gap-3 items-center relative">

            {isLoggedIn && (
              <div className="relative">

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile(!showProfile);
                  }}
                  className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold cursor-pointer hover:scale-105 transition"
                >
                  {email ? email.charAt(0).toUpperCase() : "U"}
                </div>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl p-3 z-50 border">

                    <p className="text-sm font-semibold text-orange-500">
                      👤 Profile
                    </p>

                    <p className="text-xs text-gray-600 mt-1 break-all">
                      {email}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            )}

            {!isLoggedIn && (
              <Link to="/login">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm transition">
                  Login
                </button>
              </Link>
            )}

          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-14 text-center">

        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Food delivery that feels instant ⚡🍔
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          BiteRoute brings your favorite meals fast, fresh and simple.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="bg-white shadow-sm border px-5 py-3 rounded-full text-sm text-gray-700 transition-all duration-500">
            {jokes[jokeIndex]}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">

          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition">
                  Get Started
                </button>
              </Link>

              <Link to="/login">
                <button className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 transition">
                  View Menu
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/food")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full"
              >
                Start Ordering
              </button>

              <button
                onClick={() => navigate("/food")}
                className="border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100"
              >
                View Menu
              </button>
            </>
          )}

        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-10 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">

          <div>
            <p className="text-2xl font-bold text-orange-500">15K+</p>
            <p className="text-sm text-gray-500">Orders</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-orange-500">800+</p>
            <p className="text-sm text-gray-500">Restaurants</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-orange-500">4.8⭐</p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-orange-500">20 min</p>
            <p className="text-sm text-gray-500">Delivery</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 py-14">

        <h3 className="text-2xl font-bold text-center mb-10 text-orange-500">
          🚀 How it works
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {["Choose Food 🍕", "Place Order 🛒", "Fast Delivery 🚚"].map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg text-orange-500">{t}</h4>
              <p className="text-gray-600 mt-2">
                Simple and fast food ordering experience.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-14 bg-white shadow-sm">

        <h3 className="text-2xl font-bold text-orange-500">
          Ready to order? 🍕
        </h3>

        <p className="text-gray-500 mt-2">
          Fresh food delivered fast
        </p>

        <button
          onClick={() => navigate("/food")}
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full"
        >
          Start Ordering
        </button>

      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-10 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BiteRoute. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;