const bycrptjs = require("bcryptjs");

const securePassword = async (password) => {
    try {
        const salt = process.env.BCRYPT_SALT; // Fetch the salt from environment variables  
        const passwordHash = await bycrptjs.hash(password, Number(salt));
        return passwordHash;
    } catch (error) {
        console.log("Error in password hashing:", error.message);
        throw new Error("Failed to hash the password");
    }
};

module.exports = {
    securePassword
}