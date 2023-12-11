const ComplaintPortalModel = require('../model/complaintPortalModel');
const ServiceModel = require('../model/servicesModel');


const addComplaintPortal = async (complaintPortalDetails, fileName) => {

    const {
        complaineeName,
        phoneNumber,
        description,
        serviceName,
    } = complaintPortalDetails;

        const service = await ServiceModel.findOne({ serviceName , isActive : true });
        console.log("service: " + service);

        // Storing multiple image in arrImages   
    const arrImages = fileName.map(file => file.filename);

        const complaintPortalCount = await ComplaintPortalModel.countDocuments();

        const newComplaintPortal = new ComplaintPortalModel({
        complaintPortalId: complaintPortalCount + 1,    
        complaineeName,
        phoneNumber,
        description,
        serviceName,
    });

     const complaintData = await newComplaintPortal.save();
     return complaintData;
}

module.exports = {
    addComplaintPortal
}
