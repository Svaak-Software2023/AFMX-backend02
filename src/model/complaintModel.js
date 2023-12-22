const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    complaintId: {
        type: Number,
        required: true
    },
    radioInputType: {
        type: String,
        default: ""
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true,
        lowercase: true, // Converts the email to lowercase before saving
        validate: {
            validator: function (value) {
                // Regular expression for basic email validation
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    complaintServiceName: {
        type: String,
        default: null
    },
    complaintType: {
        type: String,
        required: true,
        enum: ['Driver/Fleet Vehicle Complaint', 'Employee Complaint', 'Billing Help', 'Motor/Automobile Accident',
                'Suggestions How We Can Improve','Other']
    },
    dynamicFields: {
        type: Schema.Types.Mixed, // Allows storing dynamic data
        default: {}
    },
    complaintAddress: {
        type: String,
        required: true
    },
    dateOfIncedent: {
        type: Date,
        required: true,
    },    
    createdBy: {
        type: String,
        required: true
    },
    desireOutcome: {
        type: String,
        required: true
    },
    evidencePicture: {
        type: String,
        default: null,
        validate: {
            validator: function (value) {
                // Check if the value (file path) ends with an image extension
                return /\.(jpg|jpeg|png|gif)$/i.test(value);
            },
            message: props => `${props.value} is not a valid image file path!`
        }
    },
    evidenceVideo: {
        type: String,
        default: null,
        validate: {
            validator: function (value) {
                // Check if the value (file path) ends with a video extension
                return /\.(mp4|avi|mov|wmv)$/i.test(value);
            },
            message: props => `${props.value} is not a valid video file path!`
        }
    },  
    complaintMessage: {
        type: String,
        required: true
    },
    complaineeId: {
        type: Number,
        default: null,
    },
    complaintStatusId: {
        type: Number,
        default: 1
    },
    adminId: {
        type: Number,
        default: 1,
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

const ComplaintModel = mongoose.model("complaint", complaintSchema);
module.exports = ComplaintModel;