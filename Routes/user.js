const express = require('express');
const { register ,login ,changePassword ,deleteUser} = require('../Controllers/user');
const {verifyToken}=require('../Middleware/auth')

const router = new express.Router();

router.post('/register', register);
router.get('/login',login);
router.patch('/updatepassword',verifyToken,changePassword);
router.delete('/deleteAccount',verifyToken,deleteUser);

module.exports = router 