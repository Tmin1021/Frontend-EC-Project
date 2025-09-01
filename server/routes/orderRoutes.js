const express = require("express")
const router = express.Router()
const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const mongoose = require('mongoose');

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
router.get("/:orderid", async (req, res) => {
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

// CREATE order (need lock and rollback)
/*
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body)
        const saved = order.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})*/

router.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items } = req.body;

    // 1. Create the order in a transaction
    const [order] = await Order.create([req.body], { session });

    // 2. Update stock & sales for each product
    for (const item of items) {
      const product = await Product.findById(item.product_id).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.product_id}`);
      }

      // check stock availability
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      await Product.findByIdAndUpdate(
        item.product_id,
        {
          $inc: { stock: -item.quantity, sales_count: item.quantity }
        },
        { session }
      );
    }

    // 3. Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (err) {
    // rollback
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ error: err.message });
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

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
