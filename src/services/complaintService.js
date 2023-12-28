const ComplaintModel = require("../model/complaintModel");
const ClientModel = require("../model/clientModel");
const ServiceModel = require("../model/servicesModel");
const complaintStatusModel = require("../model/complaintStatusModel");
const ComplaintRemarksModel = require("../model/complaintRemarksModel");
// const sendEmail = require('../utility/sendEmail');
const {
  validateAndSaveRemark,
} = require("../services/complaintRemarksService");

const existingComplaintPortal = async (
  complaintDetails,
  evidencePicture,
  evidenceVideo
) => {
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
    } = complaintDetails;

    const clientIds = await ClientModel.findOne({
      clientId: loggedInIds,
      isActive: true,
    }).select(
      "-_id clientId clientFirstName clientLastName clientEmail clientPhone clientAddress clientPostalCode"
    );

    if (!clientIds) {
      throw new Error("Neither clientIds exists nor Active");
    }

    // Function to construct full name
    const constructName = (firstName, lastName) => {
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
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
        clientIds.clientLastName
      );
    }

    const existingService = await ServiceModel.findOne({
      serviceName: complaintServiceName,
      isActive: true,
    }).select("-_id serviceId serviceName isActive");

    if (!existingService) {
      throw new Error("Neither service exists nor is active");
    }

    // Define the expected fields for each complaint type
    const expectedFields = {
      "Driver/Fleet Vehicle Complaint": [
        "driverName",
        "badgeNo",
        "licensePlateNo",
        "other",
      ],
      "Employee Complaint": ["employeeName", "badgeNo", "other"],
      "Billing Help": ["billingHelp", "other"],
      "Other": ["other"], // No expected fields for 'Other' type
    };

    // Check for invalid complaint type
    if (!Object.keys(expectedFields).includes(complaintType)) {
      throw new Error("Invalid complaint type selected.");
    }

    // Check for missing required fields for the complaint type
    const expectedFieldNames = expectedFields[complaintType];
    const providedFieldNames = Object.keys(complaintDetails);
    const missingFields = expectedFieldNames.filter(
      (fieldName) => !providedFieldNames.includes(fieldName)
    );
    if (missingFields.length > 0) {
      throw new Error(
        `Missing required fields for ${complaintType}: ${missingFields.join(
          ", "
        )}`
      );
    }

    // Populate dynamicFields based on complaintType and expectedFields
    let dynamicFields = {};
    expectedFields[complaintType].forEach((field) => {
      if (complaintDetails[field]) {
        dynamicFields[field] = complaintDetails[field];
      }
    });


    // Fetch the count of the complaint
    const complaintCount = await ComplaintModel.countDocuments();

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
      complaintAddress:
        complaintAddress ||
        `${clientIds.clientAddress} ${clientIds.clientPostalCode}`,
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
    throw new Error(error.message);
  }
};

const nonExistingComplaintPortal = async (
  complaintDetails,
  evidencePicture,
  evidenceVideo
) => {
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
    } = complaintDetails;

    // Empty object to store dynamic fields
    let dynamicFields = {};

    // Define the expected fields for each complaint type
    const expectedFields = {
      "Driver/Fleet Vehicle Complaint": [
        "driverName",
        "badgeNo",
        "licensePlateNo",
        "other",
      ],
      "Employee Complaint": ["employeeName", "badgeNo", "other"],
      "Motor/Automobile Accident": ["Details", "other"],
      "Suggestions How We Can Improve": ["Suggestions", "other"], // No expected fields for 'Other' type
    };

    // Check if the complaint type is valid
    if (!Object.keys(expectedFields).includes(complaintType)) {
      throw new Error("Invalid complaint type selected.");
    }

    // Check if all expected fields are provided for the complaint type
    const expectedFieldNames = expectedFields[complaintType];
    const providedFieldNames = Object.keys(complaintDetails);

    const missingFields = expectedFieldNames.filter(
      (fieldName) => !providedFieldNames.includes(fieldName)
    );
    if (missingFields.length > 0) {
      throw new Error(
        `Missing required fields for ${complaintType}: ${missingFields.join(
          ", "
        )}`
      );
    }
    // Populate dynamicFields based on the complaintType and expectedFields
    expectedFields[complaintType].forEach((field) => {
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
    });

    const complaintCreateDetails = await complaintNewDetails.save();
    return complaintCreateDetails;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateExistingComplaint = async (
  complaintId,
  updateExistingComplaintDetail
) => {
  try {
    // Find the existing complaint
    const existingComplaint = await ComplaintModel.findOne({ complaintId });
    if (!existingComplaint || existingComplaint.complaineeId === null) {
      throw new Error(
        "Neither complaint exists nor non existing complaint users"
      );
    }
    // Check if the complaint status is being updated
    if (
      existingComplaint.complaintStatusId !==
      updateExistingComplaintDetail.complaintStatusId
    ) {
      // Update the complaint status
      const dataToUpdate = await ComplaintModel.findOneAndUpdate(
        { complaintId },
        {
          $set: {
            complaintStatusId: updateExistingComplaintDetail.complaintStatusId,
          },
        },
        {
          new: true,
        }
      );

      // Prepare the remark to be saved
      const remark = updateExistingComplaintDetail.remarks;
      remark.complaintId = complaintId;

      // Save the remark and get the saved remark object
      const savedRemark = await validateAndSaveRemark(remark);
      // Ensure dataToUpdate.remarks is initialized as an array
      if (!dataToUpdate.remarks) {
        dataToUpdate.remarks = [];
      }

      // Append the saved remark to dataToUpdate.remarks array
      dataToUpdate.remarks.push(savedRemark);

      // Return the updated remarks and complaintStatusId only
      return {
        complaintStatusId: dataToUpdate.complaintStatusId,
        remarks: dataToUpdate.remarks,
      };
    } else {
      // Prepare the remark to be saved
      const remark = updateExistingComplaintDetail.remarks;
      remark.complaintId = complaintId;

      // Save the remark and get the saved remark object
      const savedRemark = await validateAndSaveRemark(remark);

      // Add the saved remark to the existing complaint's remarks array
      existingComplaint.remarks.push(savedRemark);

      // Return the existing complaint's remarks and status
      return { remarks: existingComplaint.remarks };
    }
  } catch (error) {
    // Throw an error if any occurs
    throw new Error(error.message);
  }
};

const getAllCreateComplaintPortalService = async (complaineeId) => {
  try {
    const complaints = await ComplaintModel.find({
      complaineeId: complaineeId,
    });

    for (const complaint of complaints) {
      const remarks = await ComplaintRemarksModel.find({
        complaintId: complaint.complaintId,
      });
      complaint.remarks = remarks; // Assign remarks to complaint.remarks
    }

    if (!complaints) {
      throw new Error(errorMsg.FETCH_USERS_FAILED);
    }

    return complaints;
  } catch (error) {
    throw new Error(error.message);
  }
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
  getAllExistingAndNonExistingComplaintsService,
};
