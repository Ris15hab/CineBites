const mongoose = require('mongoose');
const Show = require('../Models/shows');
const Theatre = require('../Models/theatre');
const { response } = require('express');
const bcrypt = require('bcrypt');
const { createError } = require("../Middleware/error");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const register = async (req, res, next) => {
    try {
        const { movieName, timing, seatsAvailable, seatsBooked } = req.body;
        const theatreData=req.user;
        console.log(theatreData);
        const show = new Show({
            movieName,
            timing,
            seatsAvailable,
            seatsBooked,
            theatre_id:theatreData.theatre._id
        });
        const reponse = await show.save();
        res.status(201).json(show);
    } catch (err) {
        next(err)
    }
}

const showsById = async (req, res , next )=>{
    try {
        const show_id = req.query.id;
        // console.log(theatreName);
        if (show_id) {
            const show = await Show.findOne({_id:show_id }).populate('theatre_id');
            if (show) {
                res.status(200).json(show);
            }else{
                return next(createError(400,"show not found"));
            }
        }else{
            return next(createError(400,"show not found"));
        }
    } catch (err) {
        next(err)
    }
}

const filterShowsByName = async (req, res , next )=>{
    try {
        const show_name = req.query.name;
        // console.log(theatreName);
        if (show_name) {
            const show = await Show.find({movieName:show_name }).populate('theatre_id');
            if (show) {
                res.status(200).json(show);
            }else{
                return next(createError(400,"show not found"));
            }
        }else{
            return next(createError(400,"show not found"));
        }
    } catch (err) {
        next(err)
    }
}

const filterShowsByTheatre = async (req, res , next )=>{
    try {
        const theatre_id = req.query.theatre;
        // console.log(theatreName);
        if (theatre_id) {
            const show = await Show.find({theatre_id}).populate('theatre_id');
            if (show) {
                res.status(200).json(show);
            }else{
                return next(createError(400,"show not found"));
            }
        }else{
            return next(createError(400,"show not found"));
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {register,showsById,filterShowsByName,filterShowsByTheatre};