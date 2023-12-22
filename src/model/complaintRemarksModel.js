const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintRemarksSchema = new Schema({
    complaintRemarksId: {
        type: Number,
        required: true
    },
    complaintId: {
        type: Number,
        required: true
    },
    adminId: {
        type: Number,
        default: 1,
    },
    complaintAssigneeId: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        default: "",
    },
    remarksCreatedBy: {
        type: String,
        default: 'Admin',
        enum: ['Admin', 'Empolyee', 'Client']
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}); 

const ComplaintRemarksModel = mongoose.model('ComplaintRemarks', complaintRemarksSchema);

module.exports = ComplaintRemarksModel;
