const ComplaintModel = require('../model/complaintModel');
const ComplaintCategoryModel = require('../model/complaintCategoryModel');
const ClientModel = require('../model/clientModel');

const createComplaintPortal = async (complaintDetails, loggedInIds) => {
 
    const {
        complaintName,
        complaintDescription,
        complaintCategoryId,
        complaintStatusId,
        complaintRemarks,
        complaintAttendeeId,
        createdDate,
        updatedDate,
    } = complaintDetails

    const complaintCategory = await ComplaintCategoryModel.findOne({ complaintCategoryId });

    console.log("ComplaintCategory", complaintCategory);

    if(complaintCategoryId !== complaintCategory.complaintCategoryId) {
        throw new Error("ComplaintCategory id mismatch");
    }

    const clientIds = await ClientModel.findOne({clientId: loggedInIds, isActive: true}).select("clientId isActive");

    console.log("clientIds: ", clientIds);

    if(!clientIds) throw new Error("Neither clientIds exists nor Active");


    // Fetch the count of the complaint
   let complaintCount = await ComplaintModel.countDocuments();

    const complaintNewDetails = new ComplaintModel({
        complaintId: complaintCount + 1,
        complaintName,
        complaintDescription,
        complaintCategoryId: complaintCategory.complaintCategoryId,
        complaineeId: clientIds.clientId,
        complaintStatusId,
        complaintRemarks,
        complaintAttendeeId,
        createdDate,
        updatedDate,
    })
    const complaintCreateDetails = await complaintNewDetails.save();
    return complaintCreateDetails;
}


module.exports = {
    createComplaintPortal
}