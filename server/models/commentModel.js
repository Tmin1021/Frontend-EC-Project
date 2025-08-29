const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    star: {type: Number, default: 5, required: true}
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)