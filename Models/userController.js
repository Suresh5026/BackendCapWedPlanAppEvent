const express = require('express');
const userRouter = express.Router();
const userModel = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateToken = require('../middleWares/validateToken')


userRouter.post('/register', async (req, res) => {
    try {
        const userExists = await userModel.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(401).json({ message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        await userModel.create(req.body);

        return res.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        console.log(process.env.TOKEN_SECRET)
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        console.log(token)

        return res.status(200).json({ token, message: "Login Successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

//get user


userRouter.get('/current-user', validateToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select("-password");
        return res.status(200).json({ data: user, message: "User Fetched Successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


module.exports = userRouter;
