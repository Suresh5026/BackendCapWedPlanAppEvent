const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
   
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decryptObj = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decryptObj)
    req.user = decryptObj;
    req.token = token;
    next();
  } catch (error) {
    console.error("Token validation error:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};


module.exports = validateToken;
