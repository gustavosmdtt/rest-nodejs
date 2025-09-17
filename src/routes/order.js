const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order-controller');
const { handleDatabaseConnection } = require('../middleware/database');
const { required } = require('../middleware/auth');
const { handleTypeQuantityFormat } = require('../middleware/validations/errorHandler');
const { verifyProductExists } = require('../middleware/validations/product');
const { handleTypeOrderFormat } = require('../middleware/validations/order');


router.get(
    '/',
    required,
    handleDatabaseConnection,
    OrderController.getAllOrder);

router.post(
    '/',
    required,
    handleTypeQuantityFormat,
    handleDatabaseConnection,
    verifyProductExists,
    OrderController.addOrder
);

router.get('/:orderId',
    required,
    handleTypeOrderFormat,
    handleDatabaseConnection,
    OrderController.getOrderById);

router.delete('/:orderId', required, OrderController.deleteOrder);

module.exports = router;