const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemsSchema = new Schema({
    cartItemId: {
        type: Number,
        required: true
    },
    cartId: {
        type: Schema.Types.Number,
        ref: "Cart",
        required: true
    },
    productId: {
        type: Schema.Types.Number,
        ref: "Product",
        required: true
    },
    noOfProducts: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    }
});

const CartItemsModel = mongoose.model('CartItems', cartItemsSchema);
module.exports = CartItemsModel;