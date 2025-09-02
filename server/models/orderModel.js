const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    user_name: {type: String, required: true},
    shipping_address: {type: String, required: true},
    subtotal: {type: Number, required: true},
    off_price: {type: Number, required: true},
    status: {type: String, enum: ["Required", "Confirmed", "Canceled", "Delivering", "Done"], default: "Required" },
    payment_method: {type: String, required: true},
    message: {type: String, default: ""},

    // items
    items: [
        {
            product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
            product_name: {type: String, required: true},
            quantity: { type: Number, required: true, default: 1 },
            subtotal: { type: Number, required: true },   // quantity * unit price * option.stems (if available)
            off_price: { type: Number, default: 0 },      // discount or offer price
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)