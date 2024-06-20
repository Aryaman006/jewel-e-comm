const mongoose = require("mongoose");
const User = require('../models/userModel');


const orderSchema = new mongoose.Schema(
    {
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        paymentMode: {
            type: String,
            required: true
        },
        paymentStatus: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "Not Process",
            enum: ["Not Process", "Processing", "shipped", "delivered", "cancel"]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
