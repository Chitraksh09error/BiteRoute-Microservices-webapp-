const express = require("express");
const router = express.Router();

// 🍔 FOOD LIST (70+ ITEMS WITH CATEGORY + JOKES)
router.get("/foods", (req, res) => {
  res.send([
    // 🍕 FAST FOOD
    { _id: "pizza", name: "Pizza", price: 200, category: "fastfood" },
    { _id: "burger", name: "Burger", price: 150, category: "fastfood" },
    { _id: "pasta", name: "Pasta", price: 180, category: "fastfood" },
    { _id: "sandwich", name: "Sandwich", price: 120, category: "fastfood" },
    { _id: "fries", name: "French Fries", price: 100, category: "fastfood" },
    { _id: "hotdog", name: "Hot Dog", price: 140, category: "fastfood" },
    { _id: "nuggets", name: "Chicken Nuggets", price: 160, category: "fastfood" },
    { _id: "wrap", name: "Chicken Wrap", price: 170, category: "fastfood" },
    { _id: "shawarma", name: "Shawarma", price: 150, category: "fastfood" },
    { _id: "taco", name: "Taco", price: 190, category: "fastfood" },
    { _id: "cheeseburger", name: "Cheese Burger", price: 180, category: "fastfood" },
    { _id: "loaded_fries", name: "Loaded Fries", price: 160, category: "fastfood" },

    // 🍛 INDIAN
    { _id: "biryani", name: "Chicken Biryani", price: 250, category: "indian" },
    { _id: "veg_biryani", name: "Veg Biryani", price: 180, category: "indian" },
    { _id: "butter_chicken", name: "Butter Chicken", price: 300, category: "indian" },
    { _id: "dal", name: "Dal Tadka", price: 120, category: "indian" },
    { _id: "paneer_butter", name: "Paneer Butter Masala", price: 220, category: "indian" },
    { _id: "roti", name: "Roti", price: 20, category: "indian" },
    { _id: "naan", name: "Butter Naan", price: 40, category: "indian" },
    { _id: "paratha", name: "Aloo Paratha", price: 80, category: "indian" },
    { _id: "chole_bhature", name: "Chole Bhature", price: 130, category: "indian" },
    { _id: "rajma", name: "Rajma Chawal", price: 140, category: "indian" },
    { _id: "kadhi", name: "Kadhi Chawal", price: 130, category: "indian" },
    { _id: "poha", name: "Poha", price: 60, category: "indian" },

    // 🍜 CHINESE
    { _id: "noodles", name: "Hakka Noodles", price: 160, category: "chinese" },
    { _id: "fried_rice", name: "Fried Rice", price: 150, category: "chinese" },
    { _id: "manchurian", name: "Veg Manchurian", price: 170, category: "chinese" },
    { _id: "spring_roll", name: "Spring Roll", price: 140, category: "chinese" },
    { _id: "chilli_chicken", name: "Chilli Chicken", price: 220, category: "chinese" },
    { _id: "schezwan_rice", name: "Schezwan Rice", price: 180, category: "chinese" },
    { _id: "dimsum", name: "Dimsum", price: 200, category: "chinese" },

    // 🍰 DESSERTS
    { _id: "icecream", name: "Ice Cream", price: 90, category: "dessert" },
    { _id: "cake", name: "Chocolate Cake", price: 200, category: "dessert" },
    { _id: "gulab_jamun", name: "Gulab Jamun", price: 60, category: "dessert" },
    { _id: "rasgulla", name: "Rasgulla", price: 70, category: "dessert" },
    { _id: "brownie", name: "Brownie", price: 150, category: "dessert" },
    { _id: "donut", name: "Donut", price: 100, category: "dessert" },
    { _id: "waffle", name: "Waffle", price: 180, category: "dessert" },
    { _id: "cupcake", name: "Cupcake", price: 120, category: "dessert" },
    { _id: "cheesecake", name: "Cheesecake", price: 220, category: "dessert" },

    // 🥤 DRINKS
    { _id: "coke", name: "Coca Cola", price: 50, category: "drinks" },
    { _id: "pepsi", name: "Pepsi", price: 50, category: "drinks" },
    { _id: "coffee", name: "Coffee", price: 80, category: "drinks" },
    { _id: "tea", name: "Tea", price: 30, category: "drinks" },
    { _id: "lassi", name: "Sweet Lassi", price: 90, category: "drinks" },
    { _id: "mango_shake", name: "Mango Shake", price: 120, category: "drinks" },
    { _id: "strawberry_shake", name: "Strawberry Shake", price: 130, category: "drinks" },
    { _id: "cold_coffee", name: "Cold Coffee", price: 140, category: "drinks" },

    // 🍽 SNACKS
    { _id: "samosa", name: "Samosa", price: 20, category: "snacks" },
    { _id: "pakora", name: "Pakora", price: 60, category: "snacks" },
    { _id: "kachori", name: "Kachori", price: 40, category: "snacks" },
    { _id: "momos", name: "Momos", price: 120, category: "snacks" },
    { _id: "dhokla", name: "Dhokla", price: 80, category: "snacks" },
    { _id: "sev_puri", name: "Sev Puri", price: 70, category: "snacks" },
    { _id: "pani_puri", name: "Pani Puri", price: 50, category: "snacks" },

    // 🍳 BREAKFAST
    { _id: "idli", name: "Idli", price: 50, category: "breakfast" },
    { _id: "dosa", name: "Masala Dosa", price: 120, category: "breakfast" },
    { _id: "upma", name: "Upma", price: 80, category: "breakfast" },
    { _id: "omelette", name: "Omelette", price: 90, category: "breakfast" },
    { _id: "bread_butter", name: "Bread Butter", price: 40, category: "breakfast" }
  ]);
});

module.exports = router;