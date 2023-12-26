const ComplaintModel = require('../model/complaintModel');
const ClientModel = require('../model/clientModel');
const ServiceModel = require('../model/servicesModel');
const complaintStatusModel = require('../model/complaintStatusModel');
const ComplaintRemarksModel = require('../model/complaintRemarksModel');
// const sendEmail = require('../utility/sendEmail');
const { validateAndSaveRemark } = require('../services/complaintRemarksService')

const existingComplaintPortal = async (complaintDetails, evidencePicture, evidenceVideo) => {
    try {
        const {
            customerName,
            customerPhone,
            customerEmail,
            complaintServiceName,
            complaintType,
            complaintAddress,
            dateOfIncedent,
            createdBy,
            desireOutcome,
            complaintMessage,
            complaintStatusId,
            loggedInIds,
            adminId,
            createdDate,
            updatedDate,
        } = complaintDetails

        const clientIds = await ClientModel.findOne({ clientId: loggedInIds, isActive: true })
            .select('-_id clientId clientFirstName clientMiddleName clientLastName clientEmail clientPhone clientAddress1 clientAddress2 clientPostalCode');

        if (!clientIds) {
            throw new Error("Neither clientIds exists nor Active");
        }

        // Function to construct full name
        const constructName = (firstName, middleName, lastName) => {
            if (firstName && middleName && lastName) {
                return `${firstName} ${middleName} ${lastName}`;
            }
            return null;
        };

        // Check for existing client name or construct from client details
        let existingClientName;
        if (customerName) {
            existingClientName = customerName;
        } else {
            existingClientName = constructName(
                clientIds.clientFirstName,
                clientIds.clientMiddleName,
                clientIds.clientLastName
            );
        }

        const existingService = await ServiceModel.findOne({ serviceName: complaintServiceName, isActive: true })
            .select('-_id serviceId serviceName isActive');

        if (!existingService) {
            throw new Error("Neither service exists nor is active");
        }

        // Define the expected fields for each complaint type
        const expectedFields = {
            'Driver/Fleet Vehicle Complaint': ['driverName', 'badgeNo', 'licensePlateNo', 'other'],
            'Employee Complaint': ['employeeName', 'badgeNo', 'other'],
            'Billing Help': ['billingHelp', 'other'],
            'Other': ['other'] // No expected fields for 'Other' type
        };

        // Check for invalid complaint type
        if (!Object.keys(expectedFields).includes(complaintType)) {
            throw new Error('Invalid complaint type selected.');
        }

        // Check for missing required fields for the complaint type
        const expectedFieldNames = expectedFields[complaintType];
        const providedFieldNames = Object.keys(complaintDetails);
        const missingFields = expectedFieldNames.filter(fieldName => !providedFieldNames.includes(fieldName));
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields for ${complaintType}: ${missingFields.join(', ')}`);
        }


        // Populate dynamicFields based on complaintType and expectedFields
        let dynamicFields = {};
        expectedFields[complaintType].forEach(field => {
            if (complaintDetails[field]) {
                dynamicFields[field] = complaintDetails[field];
            }
        });

        const Statuses = getAllStatusesWithValueAndCode();


        // Fetch the count of the complaint
        const complaintCount = await ComplaintModel.countDocuments();
        // complaintCount.map(complaint => complaint.complaintId).

        // Create new ComplaintModel instance
        const complaintNewDetails = new ComplaintModel({
            complaintId: complaintCount + 1,
            customerName: existingClientName,
            customerPhone: customerPhone || clientIds.clientPhone,
            customerEmail: customerEmail || clientIds.clientEmail,
            complaintServiceName,
            complaintType,
            dynamicFields,
            evidencePicture: evidencePicture,
            evidenceVideo: evidenceVideo,
            complaintAddress: complaintAddress || `${clientIds.clientAddress1} ${clientIds.clientAddress2} ${clientIds.clientPostalCode}`,
            dateOfIncedent,
            createdBy,
            desireOutcome,
            complaintMessage,
            complaineeId: clientIds.clientId,
            complaintStatusId,
            adminId,
            createdDate,
            updatedDate,
        });

        const complaintCreateDetails = await complaintNewDetails.save();
        console.log("complaintCreateDetails", complaintCreateDetails.complaintType);

        // switch (complaintCreateDetails.complaintType) {
        //     case 'Driver/Fleet Vehicle Complaint': {
        //         const subject = `Urgent: Driver Behaviour Complaint`;
        //         const data = `
        //     <p>Dear Administrator,</p>
        //     <p>I hope this email finds you well. I am writing to express my concern and dissatisfaction</p>
        //     <p>with the behaviour of one of your drivers during my recent interaction with your service.</p>

        //     <p>On ${dateOfIncedent}, I had an encounter with a driver named ${complaintCreateDetails.dynamicFields.driverName},</p> 

        //     <p>${complaintCreateDetails.dynamicFields.badgeNo}, ${complaintCreateDetails.dynamicFields.licensePlateNo} and I found their conduct to be ${complaintMessage}.</p>

        //     <p>This behaviour is not in line with the level of service I have come to expect from AFMX.</p>

        //     <p>I believe you must be aware of this incident, and I hope you will take the necessary steps</p> 
        //     <p>to address and rectify the situation. I value the services your company provides, and I </p> 
        //     <p>believe that prompt action on your part can help maintain the positive image of your brand.</p>

        //    <p>I look forward to your investigation and a swift resolution to this matter.</p>

        //     <p>Sincerely,</p>
        //     <p>${customerName}</p>
        //     <p>${customerPhone}</p>
        //     <p>${customerEmail}</p>
        //     `
        //         sendEmail(process.env.ADMIN_EMAIL, subject, data)
        //         break;
        //     }
        //     case 'Employee Complaint': {
        //         const subject = `Urgent: Employee Behaviour Complaint`;
        //         const data = `
        //     <p>Dear Administrator,</p>
        //     <p>I hope this email finds you well. I am writing to express my concern and dissatisfaction</p>
        //     <p>with the behaviour of one of your employeers during my recent interaction with your service.</p>

        //     <p>On ${dateOfIncedent}, I had an encounter with a employee named ${complaintCreateDetails.dynamicFields.employeeName},</p> 

        //     <p>${complaintCreateDetails.dynamicFields.badgeNo}, and I found their conduct to be ${complaintMessage}.</p>

        //     <p>This behaviour is not in line with the level of service I have come to expect from AFMX.</p>

        //     <p>I believe you must be aware of this incident, and I hope you will take the necessary steps</p> 
        //     <p>to address and rectify the situation. I value the services your company provides, and I </p> 
        //     <p>believe that prompt action on your part can help maintain the positive image of your brand.</p>

        //    <p>I look forward to your investigation and a swift resolution to this matter.</p>

        //     <p>Sincerely,</p>
        //     <p>${customerName}</p>
        //     <p>${customerPhone}</p>
        //     <p>${customerEmail}</p>
        //     `
        //         sendEmail(process.env.ADMIN_EMAIL, subject, data)
        //         break;
        //     }
        //     case 'Billing Help': {
        //         const subject = `Urgent: Billing Behaviour Complaint`;
        //         const data = `
        //     <p>Dear Administrator,</p>
        //     <p>I hope this email finds you well. I am writing to express my concern and dissatisfaction</p>
        //     <p>with the behaviour of one of your billings during my recent interaction with your service.</p>

        //     <p>On ${dateOfIncedent}, I had an encounter with a billings help named ${complaintCreateDetails.dynamicFields.billingHelp},</p> 

        //     <p>${complaintCreateDetails.dynamicFields.other}, and I found their conduct to be ${complaintMessage}.</p>

        //     <p>This behaviour is not in line with the level of service I have come to expect from AFMX.</p>

        //     <p>I believe you must be aware of this incident, and I hope you will take the necessary steps</p> 
        //     <p>to address and rectify the situation. I value the services your company provides, and I </p> 
        //     <p>believe that prompt action on your part can help maintain the positive image of your brand.</p>

        //    <p>I look forward to your investigation and a swift resolution to this matter.</p>

        //     <p>Sincerely,</p>
        //     <p>${customerName}</p>
        //     <p>${customerPhone}</p>
        //     <p>${customerEmail}</p>
        //     `
        //         sendEmail(process.env.ADMIN_EMAIL, subject, data)
        //         break;
        //     }
        // }
        return complaintCreateDetails;
    } catch (error) {
        // Handle and re-throw any encountered errors
        throw new Error(error.message)
    }
};

const nonExistingComplaintPortal = async (complaintDetails, evidencePicture, evidenceVideo) => {
    try {
        const {
            radioInputType,
            customerName,
            customerPhone,
            customerEmail,
            complaintType,
            complaintAddress,
            dateOfIncedent,
            createdBy,
            desireOutcome,
            complaintMessage,
            createdDate,
            updatedDate,
        } = complaintDetails


        // Empty object to store dynamic fields
        let dynamicFields = {};

        // Define the expected fields for each complaint type
        const expectedFields = {
            'Driver/Fleet Vehicle Complaint': ['driverName', 'badgeNo', 'licensePlateNo', 'other'],
            'Employee Complaint': ['employeeName', 'badgeNo', 'other'],
            'Motor/Automobile Accident': ['Details', 'other'],
            'Suggestions How We Can Improve': ['Suggestions', 'other'] // No expected fields for 'Other' type
        };

        // Check if the complaint type is valid
        if (!Object.keys(expectedFields).includes(complaintType)) {
            throw new Error('Invalid complaint type selected.');
        }

        // Check if all expected fields are provided for the complaint type
        const expectedFieldNames = expectedFields[complaintType];
        const providedFieldNames = Object.keys(complaintDetails);

        const missingFields = expectedFieldNames.filter(fieldName => !providedFieldNames.includes(fieldName));
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields for ${complaintType}: ${missingFields.join(', ')}`);
        }
        // Populate dynamicFields based on the complaintType and expectedFields
        expectedFields[complaintType].forEach(field => {
            if (complaintDetails[field]) {
                dynamicFields[field] = complaintDetails[field];
            }
        });

        // Fetch the count of the complaint
        let complaintCount = await ComplaintModel.countDocuments();

        const complaintNewDetails = new ComplaintModel({
            complaintId: complaintCount + 1,
            radioInputType,
            customerName,
            customerPhone,
            customerEmail,
            complaintType,
            dynamicFields,
            evidencePicture: evidencePicture,
            evidenceVideo: evidenceVideo,
            complaintAddress,
            dateOfIncedent,
            createdBy,
            desireOutcome,
            complaintMessage,
            createdDate,
            updatedDate,
        })

        const complaintCreateDetails = await complaintNewDetails.save();
        return complaintCreateDetails;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateExistingComplaint = async (complaintId, updateExistingComplaintDetail) => {
    console.log("complaint", complaintId);
    // console.log("updateExistingCompl", updateExistingComplaintDetail.remarks);
    try {
        // const existingComplaint = await ComplaintModel.findOne( { complaintId } );

        const dataToUpdate = await ComplaintModel.findOneAndUpdate(
            { complaintId },
            {
                $set: { complaintStatusId: updateExistingComplaintDetail.complaintStatusId }
            },
            {
                new: true,
            }
        )

        const remark = updateExistingComplaintDetail.remarks
        remark.complaintId = complaintId

        console.log("created object: ", remark);

        // const preparedRemark = new ComplaintRemarksModel(remark)
        // console.log("preparedRemark object: ", preparedRemark);
        validateAndSaveRemark(remark);

        // // Save the new remark to the database
        // const insertedData = await preparedRemark.save();

        console.log("Found existingComplaint", dataToUpdate);
        return dataToUpdate;
    } catch (error) {
        console.log("errpr", error.message);
        throw new Error(error.message);
    }
}

// Get API's
const getAllCreateComplaintPortalService = async (complaineeId) => {

    const complaints = await ComplaintModel.find({ complaineeId: complaineeId });
    // console.log("complaint", complaintPortalData);
    complaints.forEach(async complaint => {
        const remarks = await ComplaintRemarksModel.findOne({ complaintId: complaint.complaintId });
        console.log("remarks", remarks);
        complaint.remarks.push(remarks);
    });


    if (!complaintPortalData) {
        throw new Error(errorMsg.FETCH_USERS_FAILED);
    }
    return complaintPortalData;
};

// Get API's
const getAllExistingAndNonExistingComplaintsService = async () => {

    const complaints = await ComplaintModel.find({});

    if (!complaints) {
        throw new Error(errorMsg.FETCH_USERS_FAILED);
    }
    return complaints;
};

module.exports = {
    existingComplaintPortal,
    nonExistingComplaintPortal,
    updateExistingComplaint,
    getAllCreateComplaintPortalService,
    getAllExistingAndNonExistingComplaintsService
}