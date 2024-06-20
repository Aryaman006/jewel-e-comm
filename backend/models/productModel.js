const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category', // Ensure that the reference matches the model name exactly
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory', // Ensure that the reference matches the model name exactly
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
