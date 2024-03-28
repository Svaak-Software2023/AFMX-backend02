const express = require("express");
const client_route = express.Router();

// Serve the static image file
client_route.use(express.static("public"));

const fileUploadMiddleware = require("../middleware/multer");

const client_controller = require("../controller/clientController.js");

// const { verifyToken } = require("../middleware/auth.js")

// Define the all creating api's.
client_route.post(
  "/signup",
  fileUploadMiddleware.single("clientProfileImage"),
  client_controller.registerClient
);
client_route.post("/signin", client_controller.LoginClient);
client_route.post("/forget-password", client_controller.forgetPassword);
client_route.post("/reset-password", client_controller.resetPassword);
client_route.get("/all-signup", client_controller.getAllRegistersClient);

client_route.patch("/update-membershipfield",  client_controller.updateAllClients)

module.exports = client_route;
