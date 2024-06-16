const {otpModel} = require('../models/userModel');
const otpGenrator = require('otp-generator');
const twilio = require('twilio');
const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER} = process.env;
const twilioClient = new twilio( TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);



const sendOtp = async(req, res)=>{
    try{

        const {phoneNumber} = req.body;

        const otp = otpGenrator.generate(6, {upperCaseAlphabets:false, specialChars: false, lowerCaseAlphabets: false});
        const currDate = new Date();

        await otpModel.findOneAndUpdate({phoneNumber}, {otp, otpExpiration:new Date(currDate.getTime())}, {upsert: true, new: true, setDefaultsOnInsert: true})



        await twilioClient.messages.create({
            body: `Your otp is : ${otp}`,
            to: phoneNumber,
            from: TWILIO_PHONE_NUMBER
        })

        return res.status(200).json({
            success: false,
            message: 'Otp send successfully'
        })

    }

    catch(error){
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}



module.exports = {sendOtp}