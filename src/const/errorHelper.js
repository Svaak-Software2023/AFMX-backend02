const errorMsg = {
    ADMIN_EXISTS: "Admin Exists",
    ADMIN_NOT_FOUND:"Admin ID not found",
    ADVERTIES_NOT_FOUND:"Adverties data is not found",
    ADVERTIES_NOT_UPDATED:"Adverties could not updated",
    FETCH_USERS_FAILED: "Could not fetch users",
    CLIENT_NOT_FOUND:"Client with the provided ID does not exist",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    EMAIL_NOT_FOUND:"Email does not exist",  
    ONLY_ONE_PROPERTY_ALLOWED_ERROR: "Only one property for deletion is allowed",
    ONLY_ACTIVE_PROPERTIES_ALLOWED_ERROR: "Only active properties for deletion is allowed",
    PRODUCT_ID_INVALID: "product id is not valid",
    PRODUCT_PRICE_INVALID: "product price is not valid",
    INACTIVE_CLIENT_ADVERTIES_ERROR: "Your clientId is not active, unable to create a adverties",
    NOT_ACTIVE_USER: "User is not active.. Need to create an account then login",
    NO_CLIENTS_FOUND_ERROR: "No clients found",
    NOT_FOUND_USER: "User not found",
    REQUIRED_CLIENT_CREDENTIALS: "clientEmail and clientPassword must be compulsory !",
    REQUIRED_TOKEN: "A token is required for authentication",
    ID_AND_PASSWORD_MISSING:  "Id or Password field is missing",
    INVALID_CREDENTIALS_PASSWORD: "Invalid Credentials Password",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired password reset token",
    INVALID_ACTIVE: "Invalid or inactive role",
    INVALID_LOGIN:  "Login details are not valid",
    INVAID_PASSWORD:"Password does not match",
    UNAUTHORIZED_USER: "Unauthorized User",
    UNAUTHORIZED_TOKEN: "Unauthorized Token",
    VALID_COUNTRY:  "Please select as the valid country",
    VALID_STATE:    "Please select as the valid state",
}

const infoMsg = {
    ADMIN_LOGIN_SUCCESS:     "Admin Loggin Successfully",
    CLIENT_CREATION_SUCCESS: "Client Created Successfully",
    FETCH_CLIENT_SUCCESS:    "Fetch all client register details successfully",
    LOGIN_SUCCESSFUL:        "Login Successfully",
    PASSWORD_UPDATE_SUCCESS: "Password Updated Successfully",
    PASSWORD_RESET_SUCCESS:  "Password reset was successful",
    PASSWORD_RESET_LINK:     "Password Reset Link",
    RESET_LINK_SENT:         "Link has been sent in your email",


}

const pathMsg = { 
    CLIENT_IMAGES_PATH: "../public/clientImages"
}

module.exports = {
    errorMsg,
    infoMsg,
    pathMsg
}