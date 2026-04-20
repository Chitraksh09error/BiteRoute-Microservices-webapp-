require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


const orderRoutes = require("./routes/order");


const app = express();

// 🔗 Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", orderRoutes);



// Health check
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Start server
const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));