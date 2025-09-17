const mysql = require('../mysql').pool;
const orderDAO = require('../DAO/orderDAO');
const OrderService = require('../services/orderService');

const orderServiceInstance = new OrderService(orderDAO);

exports.getAllOrder = async (req, res, next) => {
    try {
        const result = await orderServiceInstance.getAllOrders(req.dbConnection);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(error.status).send(error.response);
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const order = {
            productId: req.body.productId,
            quantity: req.body.quantity
        };

        const result = await orderServiceInstance.addOrder(req.dbConnection, order);

        return res.status(201).send(result);
    } catch (error) {
        return res.status(error.status).send(error.response);
    }
}

exports.getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const result = await orderServiceInstance.getOrderById(req.dbConnection, orderId);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(error.status).send(error.response);
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const result = await orderServiceInstance.deleteOrder(req.dbConnection, orderId);

        return res.status(202).send(result);
    } catch (error) {
        return res.status(error.status || 500).send(error.response);
    }
};