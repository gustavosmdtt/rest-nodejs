const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order-controller');
const { handleDatabaseConnection } = require('../middleware/database');
const { required } = require('../middleware/auth');

router.get(
    '/',
    required,
    handleDatabaseConnection,
    OrderController.getAllOrder);

router.post('/', required, OrderController.addOrder);
router.get('/:orderId', required, OrderController.getOrderById);
router.delete('/:orderId', required, OrderController.deleteOrder);

module.exports = router;