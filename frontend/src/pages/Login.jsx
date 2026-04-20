import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // SIGNUP
  const signup = () => {
    setLoading(true);
    setError("");

    axios
      .post(`${API}:30001/api/signup`, {
        email,
        password,
      })
      .then(() => {
        toast.success("User created successfully ✅");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Signup failed ❌");
        setLoading(false);
      });
  };

  // LOGIN
  const login = () => {
    setLoading(true);
    setError("");

    axios
      .post(`${API}:30001/api/login`, {
        email,
        password,
      })
      .then((res) => {
        const token = res.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        toast.success("Login successful ✅");
        setLoading(false);

        navigate("/");
      })
      .catch(() => {
        setError("Invalid email or password ❌");
        toast.error("Invalid email or password ❌");
        setLoading(false);
      });
  };

  const isDisabled = !email || !password || loading;

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-no-repeat bg-cover bg-center
        bg-[url('/images/mobile.png')]
        md:bg-[url('/images/pc.jpg')]
      "
    >
      {/* TOAST CONTAINER (IMPORTANT) */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* LOGIN BOX */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-6 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          🔐 Welcome
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Login or create your account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* INPUTS */}
        <div className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 space-y-3">

          <button
            onClick={login}
            disabled={isDisabled}
            className="w-full py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            onClick={signup}
            disabled={isDisabled}
            className="w-full py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 transition disabled:opacity-50"
          >
            Create Account
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;