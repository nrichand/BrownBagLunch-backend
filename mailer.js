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


var Mail = function(from, to, subject, message){
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.message = message;

    this.getMailOptions = function(){
        var mailOptions = {
            from: "brownbaglunchfr@gmail.com",
            replyTo: this.from,
            cc: this.from,
            to: this.to,
            bcc: "brownbaglunchfr@gmail.com",
            subject: this.subject,
            text: this.message,
            html: this.message
        }

        return mailOptions;
    }
}
exports.Mail = Mail;

exports.send = function send(mail){
    smtpTransport.sendMail(mail.getMailOptions(), function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

function unencryptPassword() {
    var encrypted_password = "3264e1f83f832ce69c3240b838c56b09";
    var password = "AQWZSXEDCRFVTGBYHN";
    var decipher = crypto.createDecipher("aes192", password), msg = [];
    msg.push(decipher.update(encrypted_password, "hex", "binary"));
    msg.push(decipher.final("binary"));

    return msg.join("");
}
