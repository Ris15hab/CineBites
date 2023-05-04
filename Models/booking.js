const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    theatre_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theatre'
    },
    show_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'show'
    },
    seatsBooked:{
        type: Number,
        required: true
    }

})

const Booking = new mongoose.model('booking',bookingSchema);

module.exports = Booking;