const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/authmiddleware");

router.post("/cart", auth, async (req, res) => {
  try {
    const { item, action } = req.body; // 🔥 action: "inc" or "dec"
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      i => i.foodId === item._id
    );

    if (action === "inc") {
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({
          foodId: item._id,
          name: item.name,
          price: item.price,
          qty: 1
        });
      }
    }

    if (action === "dec") {
      if (existingItem) {
        existingItem.qty -= 1;

        // ❌ remove if qty 0
        if (existingItem.qty <= 0) {
          cart.items = cart.items.filter(
            i => i.foodId !== item._id
          );
        }
      }
    }

    await cart.save();

    res.send(cart.items);

  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getcart", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.send(cart ? cart.items : []);
});

module.exports = router;