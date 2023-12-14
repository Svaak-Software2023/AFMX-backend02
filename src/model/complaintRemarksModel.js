const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const remarksSchema = new Schema({
    remarks: {
        type: String,
        required: true
    },
    remarksCreatedBy: {
        type: String,
        default: 'employee',
        enum: ['admin', 'employee', 'client']
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const complaintRemarksSchema = new Schema({
    complaintRemarksId: {
        type: Number,
        required: true
    },
    complaintId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'complaint' // Reference to the associated complaint
    },
    complaineeId: {
        type: Number,
        required: true,
    },
    adminId: {
        type: Number,
        required: true,
    },
    complaintAttendeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin' // Reference to the attendee handling the complaint (if applicable)
    },
    remarks: [remarksSchema] // Array of remarks with its schema
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields

const ComplaintRemarksModel = mongoose.model('ComplaintRemarks', complaintRemarksSchema);

module.exports = ComplaintRemarksModel;
