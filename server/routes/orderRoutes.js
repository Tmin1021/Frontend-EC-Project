const express = require("express")
const router = express.Router()
const Order = require("../models/orderModel")

// GET all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET order by order_id 
router.get("/order/:orderid", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderid)
        if (!order) return res.status(404).json({ error: `Order ${req.params.orderid} not found` })
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET all orders by user_id
router.get("/user/:userid", async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.params.userid })
        if (!orders.length) return res.status(404).json({ error: `No orders found for user ${req.params.userid}` })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET all orders by product_id 
router.get("/product/:productid", async (req, res) => {
    try {
        const orders = await Order.find({ product_id: req.params.productid })
        if (!orders.length) return res.status(404).json({ error: `No orders found for product ${req.params.productid}` })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// CREATE order
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body)
        const saved = order.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// UPDATE order
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
