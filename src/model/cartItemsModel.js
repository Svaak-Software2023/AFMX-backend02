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
        type: Number,
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

const cartItemsModel = mongoose.model('CartItems', cartItemsSchema);
module.exports = cartItemsModel;