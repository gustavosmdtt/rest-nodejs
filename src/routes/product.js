const express = require('express');
const router = express.Router();
const { required } = require('../middleware/auth');
const { handleDatabaseConnection } = require('../middleware/database');
const { verifyPriceType, verifyTitleType } = require('../middleware/validations/product');

const productController = require('../controllers/product-controller');

router.get(
    '/',
    required,
    handleDatabaseConnection,
    productController.getAllProduct
);

router.post(
    '/',
    required,
    verifyPriceType,
    verifyTitleType,
    handleDatabaseConnection,
    productController.addProduct
);

router.get(
    '/:productId',
    required,
    handleDatabaseConnection,
    productController.getProductById
);

router.put(
    '/:productId',
    required,
    handleDatabaseConnection,
    verifyPriceType,
    verifyTitleType,
    productController.updateProduct
);

router.delete(
    '/:productId',
    required,
    handleDatabaseConnection,
    productController.deleteProduct
);

module.exports = router;