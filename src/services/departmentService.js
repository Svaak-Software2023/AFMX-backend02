const { errorMsg } = require("../const/errorHelper");
const DepartmentModel = require("../model/dapartmentModel");

const registerDeparment = async (departmentDetails) => {
  const {
    departmentName,
    departmentDescription,
    jobLocation,
    createdDate,
    updatedDate,
    isActive,
  } = departmentDetails;

  // Check if department with the same name already exists
  const existingDepartment = await DepartmentModel.findOne({ departmentName });

  if (existingDepartment) {
    if (!existingDepartment.isActive) {
      throw new Error("Department is not active");
    } else {
      throw new Error("Department exists");
    }
  }

  // If the department doesn't exist, create a new one
  const departmentCount = await DepartmentModel.countDocuments();

  const newDepartment = new DepartmentModel({
    departmentId: departmentCount + 1,
    departmentName,
    departmentDescription,
    jobLocation,
    createdDate,
    updatedDate,
    isActive,
  });

  const departmentData = await newDepartment.save();
  return departmentData;
};

//Update ComplaintStatus
const updateDepartment = async (departmentId, updateDepartmentDetails) => {
  // Check existing ComplaintStatus
  const departmentData = await DepartmentModel.findOne({
    departmentId: departmentId,
  });
  if (!departmentData) {
    throw new Error(errorMsg.DEPARTENT_NOT_FOUND);
  }

  const updatedDepartment = await DepartmentModel.findOneAndUpdate(
    { departmentId: departmentId },
    { $set: updateDepartmentDetails },
    { new: true }
  );
  if (!updatedDepartment) {
    throw new Error(errorMsg.DEPARTENT_NOT_UPDATED);
  }
  return updatedDepartment;
};

// Get API's for single data
const getSingleRegistersDepartment = async (departmentSingleDetails) => {
  const { departmentId } = departmentSingleDetails;

  // Check existing department
  const departmentData = await DepartmentModel.findOne({ departmentId });

  if (!departmentData) {
    throw new Error(errorMsg.FETCH_USERS_ID_MISSING_ERROR);
  }
  return departmentData;
};

// Get API's for all data
const getAllRegistersDepartment = async () => {
  const departmentData = await DepartmentModel.find({});
  if (!departmentData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return departmentData;
};

module.exports = {
  registerDeparment,
  updateDepartment,
  getAllRegistersDepartment,
  getSingleRegistersDepartment,
};
