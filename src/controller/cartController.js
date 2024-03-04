const cartService = require('../services/cartService');

const cartAdd = async(req, res) => {
    try {
        const loggedInUser = req.decoded
        // Handle the cart response
        const cartResponse = await cartService.cartAdd(req.body, loggedInUser);
        return res.json({ message: "Cart Add Successfully", cartResponse});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    cartAdd
}