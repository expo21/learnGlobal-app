var nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "rajat.expinator21@gmail.com",
    pass: "$expinator#",
  },
  secure: true,
});
