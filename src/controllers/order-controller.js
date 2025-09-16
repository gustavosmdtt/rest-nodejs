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

exports.addOrder = (req, res, next) => {
    mysql.getConnection((error, connection) => {

        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM products WHERE id_product = ?',
            [req.body.productId],
            (error, result, fields) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Product not found for the provided ID'
                    });
                }

                connection.query(
                    'INSERT INTO orders (productId, quantity) VALUES (?,?)',
                    [req.body.productId, req.body.quantity],
                    (error, result, field) => {
                        connection.release();

                        if (error) {
                            return res.status(500).send({ error: error })
                        }

                        const quantity = req.body.quantity;
                        if (quantity === undefined || quantity === null || isNaN(quantity) || Number(quantity) <= 0) {
                            return res.status(400).send({
                                message: 'Invalid quantity. Please provide a numeric value greater than zero.'
                            });
                        }

                        const response = {
                            message: 'Order successfully inserted',
                            order: {
                                orderId: result.orderId,
                                productId: req.body.productId,
                                quantity: req.body.quantity
                            }
                        }
                        return res.status(201).send(response);
                    }
                )
            }
        )
    })
}

exports.getOrderById = (req, res, next) => {
    mysql.getConnection((error, connection) => {

        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM orders WHERE orderId = ?;',
            [req.params.orderId],
            (error, result, field) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Order not found for the provided ID'
                    })
                }

                const response = {
                    order: {
                        orderId: result[0].orderId,
                        productId: result[0].productId,
                        quantity: result[0].quantity
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
}

exports.deleteOrder = (req, res, next) => {
    mysql.getConnection((error, connection) => {

        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            `DELETE FROM orders WHERE orderId = ?`,
            [req.body.orderId],
            (error, result, field) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Order not found for the provided ID'
                    })
                }

                const response = {
                    message: 'Order successfully deleted',
                }
                res.status(202).send(response)
            }
        )
    })
}