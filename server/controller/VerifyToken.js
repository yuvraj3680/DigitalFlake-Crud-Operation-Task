const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'yourSecretKey';
const verifyToken = (req, res,next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ "status": "0", "error": "A token is required for authentication" });
       
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        return res.status(200).send({ "status": "200", "error": "resistration is sucsessfull" });
    } catch (error) {
        return res.status(401).send({ "status": "0", "error": "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;
