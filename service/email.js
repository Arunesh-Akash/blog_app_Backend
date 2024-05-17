const nodemailer=require('nodemailer');
const Constants=require('./constants');
require('dotenv').config();




const sendOTPByEmail=(otp,email)=>{
    const auth=nodemailer.createTransport({
        service:'gmail',
        secure:true,
        port:465,
        auth:{
            user:process.env.SENDER_MAIL,
            pass:process.env.SENDER_PASS
        }
    })

    const receiver={
        from:process.env.SENDER_MAIL,
        to:email,
        subject:Constants.OTP_SENT_SUBJECT,
        html:Constants.OTP_SENT_BODY.replace("{0}",email).replace("{1}",otp)
    }
    auth.sendMail(receiver,(error,res)=>{
        if(error)
        throw error
        
        console.log("Successfully sent")
    })
}

module.exports=sendOTPByEmail;