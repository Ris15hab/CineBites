//inmporting modules
const express = require("express");
const db = require("./connection");
const morgan = require('morgan');
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');

//setting port
let port = process.env.PORT || 8000

//express app
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

//import routes
const userRoute = require('./Routes/user');
const theatreRoute = require('./Routes/theatre');
const showsRoute = require('./Routes/shows');
const bookingRoute = require('./Routes/booking');

//assigning routes
app.use('/user', userRoute)
app.use('/theatre', theatreRoute)
app.use('/show', showsRoute)
app.use('/booking', bookingRoute)

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(port, () => {
    console.log(`listening to ${port}`)
})