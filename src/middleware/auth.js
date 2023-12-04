const jwt = require('jsonwebtoken');
const { errorMsg } = require('../const/errorHelper');

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if(token){
      await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    success: false,
                    message: errorMsg.UNAUTHORIZED_TOKEN
                })
            }
            req.decoded = decoded;
            next();
        })
    }else{
        return res.status(401).json({
            success: false,
            message: errorMsg.REQUIRED_TOKEN
        })
    }

}

module.exports = {
    verifyToken
}