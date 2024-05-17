module.exports = class Constant {
    static USER = {
        NAME: "name",
        EMAIL: "email",
        PASSWORD: 'password'
    }

    static LOGIN_REQUEST = {
        EMAIL: "email",
        PASSWORD: "password"
    }
    static RANDOM_NUMBER = Math.floor(100000 + Math.random() * 900000);
    static EMAIL = "email"
    static OTP = "otp"
    static OTP_SENT_SUBJECT = 'Verify Your Identity'
    static OTP_SENT_BODY = `<h3>Hello 👋🏻 From Blog LAb, </h3>
    <br/>
    We have recieved a request for creation of account with your email id. <br/>
    ➖ <b>{0}</b> <br/><br/>

    To verify this email, and confirm that this email belongs to you, Please use the below OTP on signup screen to continue.<br/>
    OTP : <b>{1}</b><br/><br/>

    <h4> Thanks 😃 , From Blog Lab </h4><br/>
`
    static BLOG_REQUEST = {
        EMAIL: "email",
        NAME:"name",
        CONTENT: "content",
    }

}