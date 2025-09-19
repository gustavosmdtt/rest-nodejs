const productDAO = require('../DAO/productDAO');
const ProductService = require('../services/productService');

const productServiceInstance = new ProductService(productDAO);

exports.getAllProduct = async (req, res, next) => {
    try {
        const result = await productServiceInstance.getAllProducts(req.dbConnection);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(error.status).send(error.response);
    }
};

exports.addProduct = async (req, res, next) => {
    try {
        const product = {
            title: req.body.title,
            price: req.body.price
        };

        const result = await productServiceInstance.addProduct(req.dbConnection, product);
        return res.status(201).send(result);
    } catch (error) {
        return res.status(error.status || 500).send(error.response || { message: error.message });
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const result = await productServiceInstance.getProductById(req.dbConnection, productId);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(error.status || 500).send(error.response || { message: error.message });
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const productData = {
            title: req.body.title,
            price: req.body.price
        };

        const result = await productServiceInstance.updateProduct(req.dbConnection, productId, productData);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(error.status || 500).send(error.response || { message: error.message });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const result = await productServiceInstance.deleteProduct(req.dbConnection, productId);
        return res.status(202).send(result);
    } catch (error) {
        return res.status(error.status || 500).send(error.response || { message: error.message });
    }
};