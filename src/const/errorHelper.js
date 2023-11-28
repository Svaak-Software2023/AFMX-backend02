const errorMsg = {
    EMAIL_ALREADY_EXISTS: "Email already exists",
    EMAIL_NOT_FOUND:"Email does not exist",  
    NOT_ACTIVE_USER: "User is not active.. Need to create an account then login",
    NO_CLIENTS_FOUND_ERROR: "No clients found",
    NOT_FOUND_USER: "User not found",
    REQUIRED_CLIENT_CREDENTIALS: "clientEmail and clientPassword must be compulsory !",
    INVALID_CREDENTIALS_PASSWORD: "Invalid Credentials Password",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired password reset token",
    INVALID_ACTIVE: "Invalid or inactive role",
    INVALID_LOGIN:  "Login details are not valid",
    INVAID_PASSWORD:"Password does not match",
    VALID_COUNTRY:  "Please select as the valid country",
    VALID_STATE:    "Please select as the valid state",
}

const infoMsg = {
    CLIENT_CREATION_SUCCESS: "Client Created Successfully",
}

const pathMsg = { 
    CLIENT_IMAGES_PATH: "../public/clientImages"
}

module.exports = {
    errorMsg,
    infoMsg,
    pathMsg
}