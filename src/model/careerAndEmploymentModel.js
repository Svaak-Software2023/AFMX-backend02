const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const careerAndEmploymentSchema = new Schema({
    careerAndEmploymentId: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        required: true
    },
    education: {
        school: {
            type: String,
            default: ""
        },
        fieldOfStudy: {
            type: String,
            default: ""
        },
        degree: {
            type: String,
            default: ""
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },
    experience: {
        title: {
            type: String,
            default: ""
        },
        company: {
            type: String,
            default: ""
        },
        industry: {
            type: String,
            default: ""
        },
        summary: {
            type: String,
            default: ""
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }
    },
    summary: {
        type: String,
        default: ""
    },
    resume: {
        type: String, //cloudinary url
        required: true,
    },
    coverLatter: {
        type: String,
        default: "",   
    },
    eligibleForEmployment: {
        type: String,
        required: true,
    },
    employedByCityWide: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
})

const CareerAndEmploymentModel =  mongoose.model('CareerAndEmployment', careerAndEmploymentSchema);

module.exports = CareerAndEmploymentModel; 



