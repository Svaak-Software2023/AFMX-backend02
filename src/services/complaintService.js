const complaintModel = require('../model/clientComplaintModel');

const createComplaintPortal = async (complaintDetails) => {
 
    const {
        complaintId,
        complaintName,
        complaintDescription,
        complaintCategoryId,
        complaineeId,
        complaintStatusId,
        complaintRemarks,
        complaintAttendeeId,
        createdDate,
        updatedDate,
    } = complaintDetails

    let complaintCount = 0;
    complaintCount = await complaintModel.find().count();

    const complaintNewDetails = await complaintModel({
        complaintId: complaintCount + 1,
        complaintName,
        complaintDescription,
        complaintCategoryId,
        complaineeId,
        complaintStatusId,
        complaintRemarks,
        complaintAttendeeId,
        createdDate,
        updatedDate,
    })

    const complaintExist = await complaintModel.findOne({ complaintName });

    if(!complaintExist) {
        
    } 
}


module.exports = {
    createComplaintPortal
}