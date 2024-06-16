const {Schema, model} = require('mongoose');


const otpSchema = new Schema({
    phoneNumber:{
        type: String,
        requried: true
    },

    otp:{
        type: String,
        requried: true
    },

    otpExpiration:{
        type: Date,
        default: Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration)
    }

})


const otpModel = model('Otp', otpSchema)


module.exports = {otpModel};