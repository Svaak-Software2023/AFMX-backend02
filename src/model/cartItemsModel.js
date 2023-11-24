const mongoose = require('mongoose');

const cartItemsSchema = mongoose.Schema({
    cartItemId: {
        type: Number,
        required: true
    },
    cartId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    noOfProducts: {
        type: Number,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CartItems', cartItemsSchema);