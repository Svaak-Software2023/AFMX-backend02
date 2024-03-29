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

// Get cart of items and products controllers 
const getCart = async(req, res) => {
    try {
        const loggedInUser = req.decoded
        // Handle the cart response
        const cartResponse = await cartService.getCart(loggedInUser, false);
        return res.json({ message: "Cart fetched Successfully", cartResponse});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Get cart of items and saveForLater products controllers 
const getAllSaveForLater = async(req, res) => {
    try {
        const loggedInUser = req.decoded
        // Handle the cart response
        const cartResponse = await cartService.getCart(loggedInUser, true);
        return res.json({ message: "Cart fetched Successfully", cartResponse});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const removeItemFromCart = async(req, res) => {
    try {
        const loggedInUser = req.decoded
        // Handle the cart response
        const cartResponse = await cartService.removeItemFromCart(req.params, loggedInUser);
        return res.json({ message: "Cart Items Removed Successfully", cartResponse});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    cartAdd,
    getCart,
    getAllSaveForLater,
    removeItemFromCart
}