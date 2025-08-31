const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" })

async function connectDB() {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      dbName: "ToDoApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected with Mongoose")
  } catch (err) {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  }
}

module.exports = connectDB
