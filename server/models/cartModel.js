const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      product_name: { type: String }, // optional redundancy
      option: [
        {
          name: String,
          stems: Number,
        }
      ],
      quantity: { type: Number, required: true, default: 1 },
      subtotal: { type: Number, required: true },   // quantity * unit price * option.stems (if available)
      off_price: { type: Number, default: 0 },      // discount or offer price
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema)
