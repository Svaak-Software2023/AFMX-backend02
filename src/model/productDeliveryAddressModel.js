const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDeliveryAddressSchema = new Schema({
    deliveryAddressId: {
        type: Number,
        required: true
    },
    cartId: {
        type: Schema.Types.Number,
        ref: 'Cart',
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
    clientState: {
        type: String,
        default: "",
    },
    clientCountry: {
        type: String,
        required: true,
    },
    clientPostalCode: {
        type: String,
        required: true
    },
});

const ProductDeliveryAddressModel = mongoose.model("ProductDeliveryAddress", productDeliveryAddressSchema);

module.exports = ProductDeliveryAddressModel;