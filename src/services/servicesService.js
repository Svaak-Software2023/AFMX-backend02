// const fs = require('fs').promises; // File System module for file operations
// const path = require('path');
const ServiceModel = require("../model/servicesModel");
const ServiceDepartmentModel = require("../model/serviceDapartmentModel");
const { errorMsg } = require("../const/errorHelper");

const createService = async (serviceDetails, fileName) => {
    const {
        serviceDepartmentId,
        serviceName,
        serviceDescription,
        createdDate,
        updatedDate,
        isActive,
    } = serviceDetails;

    // Check if service with the same name already exists
    const existingService = await ServiceModel.findOne({ serviceName });
    if (existingService) {
        if (!existingService.isActive) {
            throw new Error("Service is not active");
        } else {
            throw new Error("Service exists");
        }
    }

    // Check if service department with the same name already exists
    const existingServiceDepartment = await ServiceDepartmentModel.findOne({ serviceDepartmentId })
    if (!existingServiceDepartment) {
        throw new Error("Service department does not exist");
    }

    // check if the existing service department is not active then throw exception
    if (!existingServiceDepartment.isActive) {
        throw new Error("Service department is not active");
    }

    // Storing multiple image in arrImages   
    const arrImages = fileName.map(file => file.filename);
    console.log("arrImages: ", arrImages);
    // Remove duplicates using Set
    const uniqueImages = Array.from(new Set(arrImages));

    console.log("Unique images: ", uniqueImages);

    // Fetch the count of services
    const serviceCount = await ServiceModel.countDocuments();

    // If the service doesn't exist, create a new one
    const newService = new ServiceModel({
        serviceId: serviceCount + 1,
        serviceDepartmentId,
        serviceName,
        serviceImage: uniqueImages, // Store saved file names in the database
        serviceDescription,
        createdDate,
        updatedDate,
        isActive,
    });
    const serviceData = await newService.save();
    return serviceData;
};

const updateService = async (updatedServieDetails) => {
    const { serviceId } = updatedServieDetails;

    const existingService = await ServiceModel.findOne({ serviceId, isActive: true });
    console.log("existing service", existingService);
    if (!existingService) {
        throw new Error("Neither service exists nor is active");
    }

    const dataToUpdate = await ServiceModel.findOneAndUpdate(
        { serviceId: serviceId },
        { $set: updatedServieDetails },
        { new: true }
    );
    if (!dataToUpdate) throw new Error("Service not updated");
    return dataToUpdate;
};

const deleteService = async (serviceId, deleteDetails) => {
    // check existing bannerId
    const serviceData = await ServiceModel.findOne({ serviceId }).select("-_id isActive");

    if (!serviceData) {
        throw new Error("Service not found");
    }

    // Check if there are more than one key in deleteDetails
    if (Object.keys(deleteDetails).length !== 1) {
        throw new Error(errorMsg.ONLY_ONE_PROPERTY_ALLOWED_ERROR);
    }

    // Ensure only active properties are allowed for deletion
    if (deleteDetails.isActive == null) {
        throw new Error(errorMsg.ONLY_ACTIVE_PROPERTIES_ALLOWED_ERROR);
    }

    // update only if isActive is true
    const dataToUpdate = await ServiceModel.findOneAndUpdate(
        { serviceId: serviceId },
        { $set: deleteDetails },
        { new: true }
    );
    if (!dataToUpdate) {
        throw new Error("Service is not deleted");
    }
    return dataToUpdate;
};

// Get API's
const getAllCreateService = async () => {
    const serviceData = await ServiceModel.find({});

    if (!serviceData) {
        throw new Error(errorMsg.FETCH_USERS_FAILED);
    }
    return serviceData;
};

module.exports = {
    createService,
    updateService,
    deleteService,
    getAllCreateService
}