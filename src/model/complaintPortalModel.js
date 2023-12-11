const mongoose = require('mongoose');

const complaintPortalSchame = mongoose.Schema({
    complaintPortalId: {
        type: Number,
        required: true
    },
    complaineeName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    complaintDoc: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("complaintPortal", complaintPortalSchame);
