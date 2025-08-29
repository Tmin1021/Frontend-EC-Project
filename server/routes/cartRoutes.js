const express = require('express')
const router = express.Router()
const Cart = require("../models/cartModel")

// GET all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find()
        res.json(carts)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET cart by user_id
router.get('/:userid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.userid)
        if (!cart) return res.status(404).json({ error: `Cart of user ${req.params.id} not found` })
        res.json(cart)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// CREATE cart
router.post('/', async (req, res) => {
    try {
        const newCart = new Cart(req.body)
        const saved = newCart.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// UPDATE cart
router.put('/:id', async (req, res) => {
    try {
        const updated = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!updated) return res.status(404).json({ error: "Not found" })
        res.json(updated)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router