const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: {
        type: Number,
        required: true
    },
    productCategoryId:{
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: Array,
        required: true,
        validate: [arrayLimit, 'Max limit 5 product images']
    },
    productDescription: {
        type: String,
        required: true
    },
    productMRP: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

function arrayLimit(value) {
    return value.length <= 5;
}

const Product = mongoose.model("product", productSchema);

module.exports = Product;