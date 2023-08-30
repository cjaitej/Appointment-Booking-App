const nodemailer = require("nodemailer");

const { EMAIL, PASS } = require("../routers/env.js");

const sendOTP = async (req, res) => {
  const { email, otp } = JSON.parse(req.body);
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASS,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let message = {
    from: EMAIL,
    to: email,
    subject: "OTP - ApptSync Verification",
    text: "",
    html:
      "<body> <h3>Bonjour.. <3" +
      " !!</h3> <p>--- OTP Verification ---</p> <p>Your OTP code is: <strong>" +
      otp +
      "</strong></p> <p>This OTP is valid for a single use only and will expire in 2 mins.</p> <p>Best regards,<br> Appt</p> </body>",
  };

  return await transporter
    .sendMail(message)
    .then((result) => {
      return res.status(200).json({ msg: "sent" });
    })
    .catch((err) => {
      return res.status(500).json({ msg: "not sent" });
    });
};

module.exports = {
  sendOTP,
};
