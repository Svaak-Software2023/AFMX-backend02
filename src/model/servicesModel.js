const mongoose = require("mongoose");

const servicesModel = mongoose.Schema({
    serviceDepartmentId: {
        type: Number,
        required: true,
    },
    serviceId: {
        type: Number,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    serviceImage: {
        type: Array,
        required: true,
    },
    serviceDescription: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    updatedDate: {
        type: Date,
        default: Date.now(),
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

 module.exports = mongoose.model("Services", servicesModel);