var nodemailer = require("nodemailer"),
    crypto = require("crypto");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "brownbaglunchfr@gmail.com",
        pass: unencryptPassword()
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "brownbaglunchfr@gmail.com", // sender address
    to: "nrichand@gmail.com", // list of receivers
    subject: "On mange ensemble!?", // Subject line
    text: "BBL rocks!", // plaintext body
    html: "<b>BBL rocks!</b>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    smtpTransport.close(); // shut down the connection pool, no more messages
});


function unencryptPassword() {
    var encrypted_password = "3264e1f83f832ce69c3240b838c56b09";
    var password = "AQWZSXEDCRFVTGBYHN";
    var decipher = crypto.createDecipher("aes192", password), msg = [];
    msg.push(decipher.update(encrypted_password, "hex", "binary"));
    msg.push(decipher.final("binary"));

    return msg.join("");
}