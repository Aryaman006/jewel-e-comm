const Order = require("../models/orderModel");
const Product = require("../models/productModel"); // Import Product model

const createOrderController = async (req, res) => {
    try {
        const { products, users, status, total, paymentMode, paymentStatus } = req.body;
console.log(req.body)
        const newOrder = new Order({ products, users, status, total, paymentMode, paymentStatus});

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: newOrder
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
        });
    }
};

const getOrderController = async (req, res) => {
    try {
        const orders = await Order.find()
                                   .select("-photo")
                                   .select("-password")
                                   .populate('products.productId')
                                   .populate('users');

        res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
};


const getOrderByIdController = async (req, res) => {
    try {
        const order = await Order.find({users:req.params.id}).select("-photo").populate("products");
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching order",
            error: error.message
        });
    }
};

const updateOrderStatusController = async (req, res) => {
    try {
        const { status } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating order status",
            error: error.message
        });
    }
};


module.exports = {
    createOrderController,
    getOrderController,
    getOrderByIdController,
    updateOrderStatusController
};
