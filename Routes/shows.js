const express = require('express');
const { register , showsById,filterShowsByName,filterShowsByTheatre} = require('../Controllers/shows');
const {verifyToken}=require('../Middleware/auth')

const router = new express.Router();

router.post('/register',verifyToken,register);
router.get('/find',verifyToken,showsById);
router.get('/allShows',verifyToken,filterShowsByName);
router.get('/allTheatreShows',verifyToken,filterShowsByTheatre);

module.exports = router 