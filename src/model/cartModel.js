const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    clientId: {
        type: Number,
        required: true
    },
    cartId: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('cart', cartSchema);