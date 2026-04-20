require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");


const foodRoutes = require("./routes/food");


const app = express();

// 🔗 Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.use("/api", foodRoutes);



// Health check
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Start server
const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));