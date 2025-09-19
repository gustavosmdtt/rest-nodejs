const productDAO = require('../../DAO/productDAO');

const verifyProductExists = async (req, res, next) => {
    const productId = req.body.productId || req.params.productId;
    const result = await productDAO.getProductById(req.dbConnection, productId);

    if (result.length === 0) {
        return res.status(404).send({
            message: 'Product not found for the provided ID'
        });
    };

    next()
};

const verifyPriceType = (req, res, next) => {
    const price = req.body.price;
    if (price === undefined || price === null || isNaN(price) || Number(price) <= 0) {
        return res.status(400).send({
            message: 'Invalid price. Please provide a numeric value greater than zero.'
        });
    }

    next();
}

const verifyTitleType = (req, res, next) => {
    if (!req.body.title || req.body.title.trim() === '') {
        return res.status(400).send({
            message: 'Invalid title. Please provide a non-empty title.'
            });
    }

    next();
}

module.exports = {
    verifyProductExists,
    verifyPriceType,
    verifyTitleType
};