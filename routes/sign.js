const express = require('express');
const sign = express();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Otp = require('../models/otp');
const Constants = require('../service/constants')
const Utils = require('../service/utils');
const sendOTPByEmail = require('../service/email');
require('dotenv').config();


sign.post('/', async (req, res) => {
    const user = req.body;

    if (Utils.checkError(user, Constants.USER)) {
        res.status(400).json(Utils.checkError(user, Constants.USER));
        return;
    }

    try {

        const otp = Constants.RANDOM_NUMBER;
        sendOTPByEmail(otp, user.email)
        await Otp.create({
            email: user.email,
            otp: otp
        });

        const token = jwt.sign(user, process.env.SECRET_KEY)

        res.json({ message: "OTP sent Successfully" ,token:token});

    } catch (err) {
        if (err.code === "11000")
            res
                .status(400)
                .json(
                    Utils.generateError("USER_ALREADY_EXISTS", "User Already Exists")
                );
        else res.status(500).json(Utils.generateError(err.code, err.message));
    }
});

sign.post('/verify', async (req, res) => {

    try {
        const request = req.body
        const authToken = request.token;
        if (!authToken) {
            res.json({ message: 'Token is not found' });
            return;
        }
        const data = jwt.verify(authToken, process.env.SECRET_KEY);
        const otpData = await Otp.findOne({ email: data.email });
        if (!otpData || request.userOtp != otpData.otp) {
            res.status(400).json(Utils.generateError("OTP Not Match", "OTP verification failed"))
            return;
        }

        data.password = await Utils.encryptPassword(data.password);
        data.email = data.email.toLowerCase();
        User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })
        const token= jwt.sign({email:data.email},process.env.SECRET_KEY);
        res.json({
            success: true,
            message: "User Created Successfully!",
            token:token
        })


    } catch (err) {
        if (err.code === "11000")
            res
                .status(400)
                .json(
                    Utils.generateError("USER_ALREADY_EXISTS", "User Already Exists")
                );
        else res.status(500).json(Utils.generateError(err.code, err.message));
    }

})


module.exports = sign;