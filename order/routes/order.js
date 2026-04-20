const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authmiddleware");

// 🛒 PLACE ORDER (CART → ORDER → DELETE CART)
router.post("/order", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const email = req.user.email; // ✅ GET EMAIL FROM TOKEN

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).send({ msg: "Cart is empty" });
    }

    const order = await Order.create({
      userId,
      email,          // ✅ STORE EMAIL
      items: cart.items
    });

    await Cart.deleteOne({ userId });

    res.send({
      msg: "Order successful ✅",
      order
    });

  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const email = req.user.email; // from token

    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.send({
      msg: "Orders fetched successfully",
      orders
    });

  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;