const productCheckoutService = require('../services/productCheckoutService');

const createProductCheckout = async(req, res) => {
    try {
        const loggedInUser = req.decoded;
        await productCheckoutService.createProductCheckout(
            req.body,
            req.params,
            loggedInUser,
            res
            );
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProductCheckout
}