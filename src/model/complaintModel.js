const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarksSchema = new Schema({
    remarks: {
        type: String,
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const complaintSchema = new Schema({
    complaintId: {
        type: Number,
        required: true
    },
    complaintName: {
        type: String,
        required: true
    },
    complaintMessage: {
        type: String,
        required: true
    },
    complaintCategoryId: {
        type: Number,
        required: true
    },
    complaineeId: {
        type: Number,
        required: true
    },
    complaintStatusId: {
        type: Number,
        required: true
    },
    complaintRemarks: {
        type: [remarksSchema]
    },
    complaintAttendeeId: {
        type: Number,
        default: 1,
    },
    complaintDoc: {
        type: String,
        default: null
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("complaint", complaintSchema);