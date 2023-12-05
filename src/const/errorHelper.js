const errorMsg = {
    ADMIN_EXISTS: "Admin Exists",
    ADMIN_NOT_FOUND:"Admin ID not found",
    ADVERTIES_NOT_FOUND:"Adverties data is not found",
    ADVERTIES_NOT_UPDATED:"Adverties could not updated",
    COMPALINT_STATUS_NOT_UPDATED: "Complaint Status could not updated",
    CATEGORY_NOT_EXISTS:'Category does not exists',
    CLIENT_NOT_FOUND:"Client with the provided ID does not exist",
    COMPLAINT_NOT_UPDATED: "Complaint Category could not updated",
    COMPLAINT_STATUS_NOT_FOUND: "Complaint Status not found.",
    COMPLAINT_NOT_FOUND:"Complaint Category not found.",
    COMPLAINT_STATUS_EXISTS: "Complaint Status exists",
    COMPLAINT_EXISTS: "Complaint Category exists",
    CITY_NOT_FOUND:"City data not found",
    COUNTRY_NOT_FOUND:"Country data not found",
    COUNTRY_EXISTS: "Country exists",
    CITY_EXISTS: "City exists",
    CART_ID_NOT_VALID:"cart id is not valid",
    DEPARTENT_NOT_FOUND: "Deparment is not found.",
    DEPARTENT_NOT_UPDATED: "Deparment could not be updated",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    EMAIL_NOT_FOUND:"Email does not exist",  
    FETCH_USERS_ID_MISSING_ERROR :"Could not fetch users, Id is missing",
    FETCH_USERS_FAILED: "Could not fetch users",
    INACTIVE_CLIENT_ADVERTIES_ERROR: "Your clientId is not active, unable to create a adverties",
    INACTIVE_CLIENT_ADDRESS_ERROR:"Your clientId is not active, unable to add the Address",
    INACTIVE_CLIENT_PAYMENT_ERROR:"Your clientId is not active, unable to proceed payment",
    INACTIVE_CLIENT_CART_ERROR:  "Your clientId is not active, unable to add the cart",
    ID_AND_PASSWORD_MISSING:  "Id or Password field is missing",
    INVALID_CREDENTIALS_PASSWORD: "Invalid Credentials Password",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired password reset token",
    INVALID_ACTIVE: "Invalid or inactive role",
    INVALID_LOGIN:  "Login details are not valid",
    INVALID_PASSWORD:"Password does not match",
    NOT_ACTIVE_USER: "User is not active.. Need to create an account then login",
    NOT_FOUND_USER: "User not found",
    ONLY_ONE_PROPERTY_ALLOWED_ERROR: "Only one property for deletion is allowed",
    ONLY_ACTIVE_PROPERTIES_ALLOWED_ERROR: "Only active properties for deletion is allowed",
    PRODUCT_DELIVERY_ADDRESS_NOT_FOUND_ERROR: "Product Delivery Address is not found",
    PRODUCT_CATEGORY_NOT_ACTIVE: "Product Category is not active",
    PRODUCT_PRICE_INVALID: "product price is not valid",
    PRODUCT_ID_INVALID: "product id is not valid",
    REQUIRED_CLIENT_CREDENTIALS: "clientEmail and clientPassword must be compulsory !",
    REQUIRED_TOKEN: "A token is required for authentication",
    ROLE_NOT_FOUND:"Role not found.",
    ROLE_EXISTS: "Role exists",
    STATE_EXISTS: "State already exists",
    STATE_NOT_FOUND: "State data not found",
    UNAUTHORIZED_USER: "Unauthorized User",
    UNAUTHORIZED_TOKEN: "Unauthorized Token",
    VALID_COUNTRY:  "Please select as the valid country",
    VALID_STATE:    "Please select as the valid state",
}

const infoMsg = {
    ADMIN_LOGIN_SUCCESS:     "Admin Login Successfully",
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