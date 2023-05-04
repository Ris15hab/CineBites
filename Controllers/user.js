const mongoose = require('mongoose');
const User = require('../Models/user');
const { response } = require('express');
const bcrypt = require('bcrypt');
const { createError } = require("../Middleware/error");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        const reponse = await user.save();
        res.status(201).json(user);
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            let passwordCheck = await bcrypt.compare(password, user.password);
            if (passwordCheck) {
                const token = jwt.sign({ user }, process.env.SECRET_KEY);
                res.cookie("access_token", token, {
                    httpOnly: true,
                }).status(200).json(user);
            } else {
                return next(createError(401, "Invalid login details"));
            }
        } else {
            return next(createError(401, "Invalid login details"));
        }
    } catch (err) {
        next(err)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const userData = req.user;
        // console.log(userData);
        const user = await User.findOne({ email: userData.user.email });
        user.password = password;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userData = req.user;
        const response = await User.deleteMany({ email: userData.user.email });
        console.log(response);
        res.status(200).json({ "message": "User deleted succesfully" });
    } catch (err) {
        next(err);
    }
}

module.exports = { register, login, changePassword, deleteUser }