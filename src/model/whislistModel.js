const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const whislistSchema = new Schema({
    whislistId: {
        type: Number,
        required: true
    },
    clientId: {
        type: Schema.Types.Number,
        ref: "Client"
    },
    wishlist: [{
        type: Schema.Types.Number,
        ref: "Product",
        required: true
    }],
    createdData: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
})

const WhislistModel = mongoose.model('Whislist', whislistSchema);

module.exports = WhislistModel;