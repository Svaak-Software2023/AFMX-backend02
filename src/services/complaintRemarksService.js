const ComplaintRemarksModel = require('../model/complaintRemarksModel');


const createComplaintRemarks = async (complaintRemarksDetails) => {

    console.log("complaintRemarksDetails", complaintRemarksDetails);

    const {
        complaineeId,
        adminId,
        complaintAttendeeId,
        remarks
    } = complaintRemarksDetails;

    const complaintRemarksCount = await ComplaintRemarksModel.countDocuments();

    const complaintRemarksNewDetails = new ComplaintRemarksModel({
        complaintRemarksId: complaintRemarksCount + 1,
        complaintId,
        complaineeId,
        adminId,
        complaintAttendeeId,
        remarks
    })
    const complaintRemarksCreateDetails = await complaintRemarksNewDetails.save();
    return complaintRemarksCreateDetails;

}


module.exports = {
    createComplaintRemarks,
}