const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    clientId: {
        type: Schema.Types.Number,
        ref: "Client"
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

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;