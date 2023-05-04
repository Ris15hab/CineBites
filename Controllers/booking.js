const mongoose = require('mongoose');
const Show = require('../Models/shows');
const Theatre = require('../Models/theatre');
const Booking = require('../Models/booking');
const User = require('../Models/user');
const { response } = require('express');
// const bcrypt = require('bcrypt');
const { createError } = require("../Middleware/error");
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { updateSeats ,updateSeatsIncrease } = require('../Middleware/updateSeats')

const register = async (req, res, next) => {
    try {
        const { show_id, seatsBooked } = req.body;
        const userData = req.user;
        const showsData = await Show.findOne({ _id: show_id });
        const booking = new Booking({
            show_id,
            seatsBooked,
            user_id: userData.user._id,
            theatre_id: showsData.theatre_id
        })
        const check = await updateSeats(seatsBooked, show_id);
        console.log(check)
        if (check) {
            await booking.save();
            res.status(200).json(booking)
        }else{
            return next(createError(400,"Insufficient seats available"));
        }
    } catch (err) {
        next(err)
    }
}

const cancelBooking = async (req, res, next) => {
    try {
        const {_id } = req.body;
        const userData = req.user;
        const bookingData = await Booking.findOne({user_id:userData.user._id ,_id});
        const seatsBooked = bookingData.seatsBooked;
        const show_id = bookingData.show_id;
        await updateSeatsIncrease(seatsBooked, show_id);
        await Booking.deleteMany({user_id:userData.user._id , _id})
        res.status(200).json({"message":"booking cancelled..."});
    } catch (err) {
        next(err)
    }
}

const bookingDetails = async (req, res, next) => {
    try {
        userData = req.user;
        const details = await Booking.find({ user_id: userData.user._id }).populate('show_id').populate('theatre_id');
        if (details) {
            res.status(200).json(details);
        } else {
            res.status(200).json({ "message": "Please book shows to find details here..." });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = { register, bookingDetails ,cancelBooking}