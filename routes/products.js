const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

// Add a new product (Requires authentication)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = new Product({ name, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error adding product" });
    }
});

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});

// Update a product (Requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
});

// Delete a product (Requires authentication)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});

module.exports = router;
