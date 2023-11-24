const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
    productCategoryId: {
        type: Number,
        required: true
    },
	productCategoryName: {
        type: String,
        required: true
    },
	productCategoryDescription: {
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

module.exports = mongoose.model("productcategory", productCategorySchema);