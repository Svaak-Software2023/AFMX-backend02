const cartItemsService = require("../services/cartItemsService");

const addCartItems = async(req, res) => {
    try {
        // Handle the cart item response
        const cartItemsResponse = await cartItemsService.addCartItems(req.body);
        return res.json({ message: "Cart Items Added", cartItemsResponse});
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    addCartItems,
}