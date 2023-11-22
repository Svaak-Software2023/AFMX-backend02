const adminService = require("../services/superAdminService");

const loginAdmin = async (req, res) => {
  try {
    const adminDetails = req.body ;
    const adminResponse = await adminService.loginAdmin(adminDetails);
    return res.json({ message: "Admin Loggin Successfully", adminResponse})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const changePassowrd = async(req, res) => {
    try {
        const updateResponse = await adminService.changePassowrd(req.body);
        return res.json({ message: "Password Updated Successfully", updateResponse})
        
    } catch (error) {
    return res.status(500).json({ error: error.message });      
    }
}

module.exports = {
    loginAdmin,
    changePassowrd
}
