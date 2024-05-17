const express = require('express');
const login = express();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Constants = require('../service/constants')
const Utils = require('../service/utils')
const bcrypt=require('bcrypt');
require('dotenv').config();



login.post("/", async (req, res) => {
  const request = {
    email: req.body[Constants.LOGIN_REQUEST.EMAIL],
    password: req.body[Constants.LOGIN_REQUEST.PASSWORD],
  };

  if (Utils.checkError(request, Constants.LOGIN_REQUEST)) {
    res.status(400).json(Utils.checkError(request, Constants.LOGIN_REQUEST));
    return;
  }

  try {
    request.email = request.email.toLowerCase();
    let data = await User.findOne({ email: request.email });
    if (data) {
      let passwordMatch = await bcrypt.compare(request.password, data.password);
      if (passwordMatch) {
        const successResponse = Utils.generateSuccess(
          "AUTHORISED",
          "Successfully Logged In"
        );
        const token = jwt.sign(
          { email: data.email },
          process.env.SECRET_KEY
        );

        res.json({ successResponse, token: token });
        return;
      } else {
        res
          .status(401)
          .json(AppUtils.generateError("UNAUTHORIZED", "Invalid Credentials"));
        return;
      }
    } else {
      res
        .status(404)
        .json(
          Utils.generateError(
            "USER_NOT_FOUND",
            `No user found with ${request.email}`
          )
        );
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(Utils.generateError(err.code, err.message));
  }
});

login.post('/current', async (req, res) => {
  const {token} = req.body
  if (!token) {
    res.json({ message: 'Token is not found' });
    return;
  }
  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decodeToken.email }).select('-password');
    res.status(200).json({user});
  }
  catch (err) {
    res.status(500).json(Utils.generateError(err.code, err.message));
  }
})

module.exports = login