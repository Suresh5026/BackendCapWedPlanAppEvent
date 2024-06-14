const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const admin = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
     
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized.' });
  }
};

module.exports = admin;
