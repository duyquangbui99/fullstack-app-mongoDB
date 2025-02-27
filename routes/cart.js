const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Add a product to the cart (Check if cart exists first)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Get user ID from JWT

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Check if the user already has a cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({ user: userId, products: [] });
        }

        // Check if the product is already in the cart
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (existingProductIndex !== -1) {
            // If product exists, update quantity
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // If product does not exist, add it
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
});

// ✅ Get cart items
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate("products.product");

        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart" });
    }
});

// Remove a specific item from the cart
router.delete("/:productId", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        res.json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing product from cart", error });
    }
});

// Clear the entire cart
router.delete("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart is already empty" });

        cart.products = [];
        await cart.save();

        res.json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
});

module.exports = router;
