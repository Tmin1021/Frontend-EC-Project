const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  stems: { type: Number, required: true},
  description: String,
  image_url: [String],
  fill_stock_date: Date,
  sales_count: { type: Number, default: 0 },

  // flower detail
  flower_type: [String],
  colors: [String],
  occasions: [String],  
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)
