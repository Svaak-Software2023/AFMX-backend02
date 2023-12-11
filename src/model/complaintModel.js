const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarksSchema = new Schema({
    remarks: {
        type: 'string',
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
})

const complaintSchema = new Schema({
    complaintId: {
        type: Number,
        required: true
    },
    complaintName: {
        type: String,
        required: true
    },
    complaintDescription: {
        type: String,
        default: ""
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
        ref: 'Admin',
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    }
});

module.exports = mongoose.model("complaint", complaintSchema);