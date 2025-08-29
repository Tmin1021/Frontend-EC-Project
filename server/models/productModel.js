const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["flower", "accessory"], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  description: String,
  image_url: String,
  fill_stock_date: Date,

  // nested object only when type = flower
  flower_details: {
    flower_type: [String],
    colors: [String],
    occasions: [String],
    options: [
      {
        name: String,
        stems: Number,
      },
    ],
  },
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)
