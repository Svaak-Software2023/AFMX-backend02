const { errorMsg } = require("../const/errorHelper");
const ServiceDepartmentModel = require("../model/serviceDapartmentModel");

const createServiceDepartment = async (serviceDepartmentDetails) => {
  const { serviceDepartmentName, createdDate, updatedDate, isActive } =
    serviceDepartmentDetails;

  // Check if department with the same name already exists
  const existingServiceDepartment = await ServiceDepartmentModel.findOne({
    serviceDepartmentName,
  });

  if (existingServiceDepartment) {
    if (!existingServiceDepartment.isActive) {
      throw new Error("Service Department is not active");
    } else {
      throw new Error("Service Department exists");
    }
  }

  // Find the largest existing serviceDepartmentId
  const maxServiceDepartmentCount = await ServiceDepartmentModel.findOne(
    {},
    { serviceDepartmentId: 1 },
    { sort: { serviceDepartmentId: -1 } }
  );

  // Calculate the next serviceDepartmentId
  const nextServiceDepartmentId = maxServiceDepartmentCount
    ? maxServiceDepartmentCount.serviceDepartmentId + 1
    : 1;

  const newServiceDepartment = new ServiceDepartmentModel({
    serviceDepartmentId: nextServiceDepartmentId,
    serviceDepartmentName,
    createdDate,
    updatedDate,
    isActive,
  });

  const serviceDepartmentData = await newServiceDepartment.save();
  return serviceDepartmentData;
};

//Update ComplaintStatus
const updateServiceDepartment = async (
  serviceDepartmentId,
  updateServiceDepartmentDetails
) => {
  // Check existing ComplaintStatus
  const serviceDepartmentData = await ServiceDepartmentModel.findOne({
    serviceDepartmentId,
  }).select("-_id serviceDepartmentName isActive");
  if (!serviceDepartmentData) {
    throw new Error(errorMsg.DEPARTENT_NOT_FOUND);
  }

  const updatedServiceDepartment =
    await ServiceDepartmentModel.findOneAndUpdate(
      { serviceDepartmentId: serviceDepartmentId },
      { $set: updateServiceDepartmentDetails },
      { new: true }
    );
  if (!updatedServiceDepartment) {
    throw new Error(errorMsg.DEPARTENT_NOT_UPDATED);
  }
  return updatedServiceDepartment;
};

// Get API's for single data
const getSingleCreateServiceDepartment = async (
  serviceDepartmentSingleDetails
) => {
  const { serviceDepartmentId } = serviceDepartmentSingleDetails;

  // Check existing service Department
  const serviceDepartmentData = await ServiceDepartmentModel.findOne({
    serviceDepartmentId,
  });

  if (!serviceDepartmentData) {
    throw new Error(errorMsg.FETCH_USERS_ID_MISSING_ERROR);
  }
  return serviceDepartmentData;
};

// Get API's for all data
const getAllCreateServiceDepartment = async () => {
  const serviceDepartmentData = await ServiceDepartmentModel.find({});
  if (!serviceDepartmentData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return serviceDepartmentData;
};

module.exports = {
  createServiceDepartment,
  updateServiceDepartment,
  getAllCreateServiceDepartment,
  getSingleCreateServiceDepartment,
};
