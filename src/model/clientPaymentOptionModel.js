const mongoose = require('mongoose');

const clientPaymentOptionSchema = mongoose.Schema({
    paymentOptionId: {
        type: Number,
        required: true
    },
    clientId: {
        type: Number,
        required: true
    },
    paymentOption: {
        type: String,
        required: true
    },
    // Additional fields related to payment, if needed
    // ...
});

module.exports = mongoose.model('ClientPaymentOption', clientPaymentOptionSchema);
