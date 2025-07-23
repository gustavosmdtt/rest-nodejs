const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const productController = require('../controllers/product-controller')

router.get('/', login.required, productController.getAllProduct);
router.post('/', login.required, productController.addProduct);
router.get('/:id_produto', login.required, productController.getProductById);
router.patch('/', login.required, productController.updateProduct);
router.delete('/', login.required, productController.deleteProduct);

module.exports = router;