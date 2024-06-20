const express = require("express");
const router = express.Router();
const { createOrder, checkPaymentStatus } = require('../razorpay');

router.post('/createOrder', async (req, res) => {
    const { amount } = req.body;
    try {
        const order = await createOrder(amount);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Failed to create order' });
    }
});

router.get('/status/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;
        const paymentStatus = await checkPaymentStatus(paymentId);
        res.json({ status: paymentStatus });
    } catch (error) {
        console.error('Error fetching payment status:', error);
        res.status(500).json({ error: 'Failed to fetch payment status' });
    }
});

module.exports = router;
