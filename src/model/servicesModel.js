const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesModel = new Schema({
    serviceId: {
        type: Number,
        required: true,
    },
    serviceDepartmentId: {
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

 const ServiceModel = mongoose.model("Services", servicesModel);

 module.exports = ServiceModel;