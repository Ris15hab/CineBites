const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const theatreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        unique: true
    }
})

theatreSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const Theatre = new mongoose.model('theatre',theatreSchema);

module.exports = Theatre;