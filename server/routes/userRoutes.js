const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

const router = express.Router()

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password") // exclude password
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) return res.status(404).json({ error: "User not found"})
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// CREATE user
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, password, address, role } = req.body
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({ error: "Name, email, password, address and role are required" })
    }

    // check duplicate email
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ name, email, phone, password: hashedPassword, address, role })
    await newUser.save()

    res.status(201).json({ message: "User created", userId: newUser._id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    res.json({ 
      message: "Login successful", 
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, address: user.address, role: user.role } 
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// UPDATE user
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
