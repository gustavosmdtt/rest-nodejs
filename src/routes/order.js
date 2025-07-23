const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order-controller');

router.get('/', OrderController.getAllOrder);
router.post('/', OrderController.addOrder);
router.get('/:orderId', OrderController.getOrderById);
router.delete('/:orderId', OrderController.deleteOrder);

module.exports = router;