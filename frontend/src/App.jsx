import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Food from "./pages/Food.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx"; // 👈 import

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      {/* ✅ Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/food"
        element={
          <ProtectedRoute>
            <Food />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;