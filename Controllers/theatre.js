const mongoose = require('mongoose');
const Theatre = require('../Models/theatre');
const { response } = require('express');
const bcrypt = require('bcrypt');
const { createError } = require("../Middleware/error");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const register = async (req, res, next) => {
    try {
        const { name, city, email, password, phoneNumber } = req.body;
        const theatre = new Theatre({
            name,
            city,
            email,
            password,
            phoneNumber
        });
        await theatre.save();
        res.status(201).json(theatre);
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const theatre = await Theatre.findOne({ email });
        if (theatre) {
            let passwordCheck = await bcrypt.compare(password, theatre.password);
            if (passwordCheck) {
                const token = jwt.sign({ theatre }, process.env.SECRET_KEY);
                res.cookie("access_token", token, {
                    httpOnly: true,
                }).status(200).json(theatre);
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
        const theatreData = req.user;
        // console.log(theatreData);
        // console.log(userData.user.email);
        const theatre = await Theatre.findOne({ email: theatreData.theatre.email });
        theatre.password = password;
        await theatre.save();
        res.status(200).json(theatre);
    } catch (err) {
        next(err);
    }
}

const deleteTheatre = async (req, res, next) => {
    try {
        const theatreData = req.user;
        const response = await Theatre.deleteMany({ email: theatreData.theatre.email });
        console.log(response);
        res.status(200).json({ "message": "Theatre deleted succesfully" });
    } catch (err) {
        next(err);
    }
}

const detailsTheatre = async (req, res, next) => {
    try {
        const theatreName = req.query.name;
        console.log(theatreName);
        if (theatreName) {
            const theatre = await Theatre.findOne({ name: theatreName });
            if (theatre) {
                res.status(200).json(theatre);
            } else {
                return next(createError(400, "Theatre not found"));
            }
        } else {
            return next(createError(400, "Theatre not found"));
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { register, login, changePassword, deleteTheatre, detailsTheatre }