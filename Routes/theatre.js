const express = require('express');
const { register ,login ,changePassword ,deleteTheatre,detailsTheatre} = require('../Controllers/theatre');
const {verifyToken}=require('../Middleware/auth')

const router = new express.Router();

router.post('/register', register);
router.get('/login',login);
router.patch('/updatepassword',verifyToken,changePassword);
router.delete('/deleteAccount',verifyToken,deleteTheatre);
router.get('/find',verifyToken,detailsTheatre);

module.exports = router 