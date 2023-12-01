const jwt = require("jsonwebtoken");

const generateToken = async (id) => { 
    try {
      const jwt_secret = process.env.JWT_SECRET; // Fetch secret key from environment variables
      const token = await jwt.sign({ id }, jwt_secret);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
};

module.exports = {
    generateToken
}