const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RxMemberShipeSchema = new Schema({
    rxMemberShipeId: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.Number,
        ref: "Client",
        required: true
    },
    memberShipName: {
        type: String,
        required: true
    },
    memberShipType: {
        type: String,
        required: true
    },
    memberShipPlan: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
    expireDate: {
        type: Date,
        default: Date.now,
    },
    customerId: {
        type: String,
        required: true
    }
})


const RxMemberShipeModel = mongoose.model('RxMemberShipe', RxMemberShipeSchema);

module.exports = RxMemberShipeModel;