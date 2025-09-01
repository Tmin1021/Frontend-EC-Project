const express = require("express")
const cors = require("cors")
const connectDB = require("./connect")
const imageRoutes = require('./routes/imageRoutes');
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const commentRoutes = require("./routes/commentRoutes")

const app = express()
const PORT = process.env.PORT || 5001

// middleware
app.use(cors())
app.use(express.json())

// connect to DB
connectDB()

// routes
app.use('/api/images', imageRoutes);
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/comments", commentRoutes)

app.get("/", (req, res) => res.send("API is working"))

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))
