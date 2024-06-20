const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (amount, currency = "INR") => {
    const options = {
        amount: amount * 100, // Amount in smallest currency unit (paise for INR)
        currency,
        receipt: `receipt_order_${Date.now()}`
    };
    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
}

const checkPaymentStatus = async (paymentId) => {
    const razorpayApiKey = process.env.RAZORPAY_KEY_ID;
    const razorpayApiSecret = process.env.RAZORPAY_KEY_SECRET;

    const authHeader = {
        Authorization: `Basic ${Buffer.from(`${razorpayApiKey}:${razorpayApiSecret}`).toString('base64')}`,
    };

    try {
        const response = await axios.get(`https://api.razorpay.com/v1/payments/${paymentId}`, {
            headers: authHeader,
        });

        const paymentStatus = response.data.status;
        return paymentStatus;
    } catch (error) {
        console.error('Error fetching payment status:', error);
        throw new Error('Failed to fetch payment status');
    }
};

module.exports = { createOrder, checkPaymentStatus };
