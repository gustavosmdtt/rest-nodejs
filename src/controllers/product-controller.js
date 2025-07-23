const mysql = require('../mysql').pool;

exports.getAllProduct = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM products;',
            (error, result, field) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length === 0) {
                    return res.status(404).send({ message: 'No products registered.' });
                }

                const response = {
                    quantity: result.length,
                    products: result.map(product => {
                        return {
                            productId: product.productId,
                            title: product.title,
                            price: product.price
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
    })
}

exports.addProduct = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'INSERT INTO products (title, price) VALUES (?,?)',
            [req.body.title, req.body.price],
            (error, result, field) => {
                connection.release();
                if (error) {
                    return res.status(500).send({ error: error })
                }

                const price = req.body.price;
                if (price === undefined || price === null || isNaN(price) || Number(price) <= 0) {
                    return res.status(400).send({
                        message: 'Invalid price. Please provide a numeric value greater than zero.'
                    });
                }

                if (!req.body.title || req.body.title.trim() === '') {
                    return res.status(400).send({
                        message: 'Invalid title. Please provide a non-empty title.'
                    });
                }

                const response = {
                    message: 'Product successfully inserted',
                    productCreated: {
                        productId: result.productId,
                        title: req.body.title,
                        price: req.body.price
                    }
                }
                return res.status(201).send(response);
            }

        )
    })
}

exports.getProductById = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        connection.query(
            'SELECT * FROM products WHERE productId = ?;',
            [req.params.productId],
            (error, result, field) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Product not found for the provided ID'
                    })
                }

                const response = {
                    product: {
                        productId: result[0].productId,
                        title: result[0].title,
                        price: result[0].price
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
}

exports.updateProduct = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        connection.query(
            `UPDATE products
                SET title       = ?,
                    price      = ?
              WHERE productId = ?`,
            [
                req.body.title,
                req.body.price,
                req.body.productId
            ],
            (error, result, field) => {
                connection.release()
                if (error) {
                    return res.status(500).send({ error: error })
                }

                const price = req.body.price;
                if (price === undefined || price === null || isNaN(price) || Number(price) <= 0) {
                    return res.status(400).send({
                        message: 'Invalid price. Please provide a numeric value greater than zero.'
                    });
                }

                if (!req.body.title || req.body.title.trim() === '') {
                    return res.status(400).send({
                        message: 'Invalid title. Please provide a non-empty title.'
                    });
                }

                connection.query(
                    'SELECT * FROM products WHERE productId = ?;',
                    [req.body.productId],
                    (error, result, field) => {
                        connection.release();

                        if (error) {
                            return res.status(500).send({ error: error })
                        }

                        if (result.length == 0) {
                            return res.status(404).send({
                                message: 'Product not found for the provided ID'
                            })
                        }
                    }
                )

                const response = {
                    message: 'Product successfully updated',
                    productUpdated: {
                        productId: req.body.productId,
                        title: req.body.title,
                        price: req.body.price
                    }
                }
                return res.status(202).send(response);
            }
        )
    })
}

exports.deleteProduct = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }
        connection.query(
            `DELETE FROM products WHERE productId = ?`,
            [req.body.productId],
            (error, result, field) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Product not found for the provided ID'
                    })
                }

                const response = {
                    message: 'Product successfully deleted'
                }
                res.status(202).send(response)
            }
        )
    })
}