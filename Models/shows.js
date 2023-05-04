const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const showsSchema = mongoose.Schema({
    movieName:{
        type: String,
        required: true
    },
    theatre_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theatre'
    },
    timing:{
        type: String,
        required: true
    },
    seatsAvailable:{
        type: Number,
        required: true
    },
    seatsBooked:{
        type: Number,
        default: 0
    }
})

// theatreSchema.pre('save', async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// })

const Show = new mongoose.model('show',showsSchema);

module.exports = Show;