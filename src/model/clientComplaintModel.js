const mongoose = require('mongoose');

const clientComplaintSchema = mongoose.Schema({
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
        type: String,
        required: true
    },
    complaineeId: {
        type: String,
        required: true
    },
    complaintStatusId: {
        type: String,
        required: true
    },
    complaintRemarks: {
        type: String,
        default: ""
    },
    complaintAttendeeId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    }
});

module.exports = mongoose.model("complaint", clientComplaintSchema);