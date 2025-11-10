const handleFormatJsonError = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            message: 'Invalid JSON format',
            error: err.message
        });
    }

    next(err);
}

const handleTypeQuantityFormat = (req, res, next) => {
    const quantity = req.body.quantity;
    if (quantity === undefined || quantity === null || isNaN(quantity) || Number(quantity) <= 0) {
        return res.status(400).send({
            message: 'Invalid quantity. Please provide a numeric value greater than zero.'
        });
    }

    next();
}

const handleTypeProductIdFormat = (req, res, next) => {
    const productId = req.params.productId;
    if (productId === undefined || productId === null || isNaN(productId) || Number(productId) <= 0) {
        return res.status(400).send({
            message: 'Invalid product ID format'
        });
    }

    next();
}

module.exports = { 
    handleFormatJsonError,
    handleTypeQuantityFormat,
    handleTypeProductIdFormat
};