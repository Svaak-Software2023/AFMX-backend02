const servicesService = require('../services/servicesService');
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const createService = async (req, res) => {
    try {
        const createServiceResponse = await servicesService.createService(req.body, req.files);

        // Assuming req.files is an array of files
        const uploadedFiles = req.files.map((file) => file.path);
        const targetDirectories = Array(req.files.length).fill(
            path.join(__dirname, "../public/servicesImages")
        );

        await uploadToVSCode(uploadedFiles, targetDirectories);

        return res.status(201).json({ message: "Service created successfully", createServiceResponse });

    } catch (error) {
        // If an error occurs, delete the uploaded files
        if (req.files) {
            req.files.forEach((file) => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }

        return res.status(500).json({ message: error.message });

    }
}

const updateService = async (req, res) => {
    try {
        const updateServiceResponse = await servicesService.updateService(req.body);
        return res.status(201).json({ message: "Service updated successfully", updateServiceResponse });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteService = async (req, res) => {
    try {
        // Handle the delete banner response based on bannerId
        const serviceDeleteResponse = await servicesService.deleteService(
            req.params.serviceId,
            req.body
        );
        return res.json({ message: "Service deactivated", serviceDeleteResponse });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllCreateService = async (req, res) => {
    try {
        const getResponse = await servicesService.getAllCreateService();
        return res.json({
            message: "Fetch all service create details successfully ",
            getResponse,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createService,
    updateService,
    deleteService,
    getAllCreateService,
}