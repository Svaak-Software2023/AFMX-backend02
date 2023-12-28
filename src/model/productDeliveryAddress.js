const mongoose = require('mongoose');

const productDeliveryAddressSchema = mongoose.Schema({
    deliveryAddressId: {
        type: Number,
        required: true
    },
    cartId: {
        type: Number,
        required: true
    },
    clientId: {
        type: Number,
        required: true
    },
    clientPhone: {
        type: String,
        default: "",
    },
    clientAddress: {
        type: String,
        required: true,
    },
    clientCity: {
        type: String,
        default: "",
    },
    clientPostalCode: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("productDeliveryAddress", productDeliveryAddressSchema);