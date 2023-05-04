const express = require('express');
const { register , bookingDetails , cancelBooking} = require('../Controllers/booking');
const {verifyToken}=require('../Middleware/auth')

const router = new express.Router();

router.post('/register',verifyToken,register);
router.get('/details',verifyToken,bookingDetails);
router.delete('/cancel',verifyToken,cancelBooking)

module.exports = router 