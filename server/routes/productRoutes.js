const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")

// GET all products with pagination (ex: GET /api/products?page=2)
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // current page, default 1
        const limit = 12; // items per page
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(); // total number of products
        const totalPages = Math.ceil(total / limit);

        res.json({
            page,
            totalPages,
            totalProducts: total,
            products,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// CREATE product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
