const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController');
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware');

router.post('/create-order', orderControllers.createOrderController,requireSignIn);
router.get('/orders', orderControllers.getOrderController,requireSignIn,isAdmin);
router.get('/order/:id', orderControllers.getOrderByIdController,requireSignIn);
router.put('/update-order/:id/:status', orderControllers.updateOrderStatusController,isAdmin);

module.exports = router;
