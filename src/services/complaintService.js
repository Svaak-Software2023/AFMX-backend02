const ComplaintModel = require('../model/complaintModel');
const ComplaintCategoryModel = require('../model/complaintCategoryModel');
const ClientModel = require('../model/clientModel');

const createComplaintPortal = async (complaintDetails, loggedInIds, fileName) => {
 
    const {
        complaintName,
        complaintMessage,
        complaintCategoryId,
        complaintStatusId,
        complaintRemarks,
        complaintAttendeeId,
        createdDate,
        updatedDate,
    } = complaintDetails

    const complaintCategory = await ComplaintCategoryModel.findOne({ complaintCategoryId, isActive: true });

    console.log("ComplaintCategory", complaintCategory);

    if(!complaintCategory) {
        throw new Error("ComplaintCategory id mismatch");
    }

    const clientIds = await ClientModel.findOne({clientId: loggedInIds, isActive: true})
    .select("clientId isActive");

    console.log("clientIds: ", clientIds);

    if(!clientIds) {
        throw new Error("Neither clientIds exists nor Active");
    }
    
    // Fetch the count of the complaint
   let complaintCount = await ComplaintModel.countDocuments();

    const complaintNewDetails = new ComplaintModel({
        complaintId: complaintCount + 1,
        complaintName,
        complaintMessage,
        complaintCategoryId: complaintCategory.complaintCategoryId,
        complaineeId: clientIds.clientId,
        complaintStatusId,
        complaintRemarks,
        complaintAttendeeId,
        complaintDoc: fileName,
        createdDate,
        updatedDate,
    })
    const complaintCreateDetails = await complaintNewDetails.save();
    return complaintCreateDetails;
}


module.exports = {
    createComplaintPortal
}