const productCheckoutService = require('../services/productCheckoutService');

const createProductCheckout = async(req, res) => {
    try {
        const loggedInUser = req.decoded;
        const productCheckout = await productCheckoutService.createProductCheckout(
            req.body,
            req.params,
            loggedInUser
            );
        return res.status(201).json({ message: "Product Checkout Created", productCheckout });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProductCheckout
}