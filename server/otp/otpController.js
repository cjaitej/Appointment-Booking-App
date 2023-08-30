const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

var OTP = mongoose.model("otp", otpSchema);

const storeOTP = async (req, res) => {
  let user = new OTP();
  req.body = JSON.parse(req.body);
  user.email = req.body.email;
  user.otp = req.body.otp;
  await user
    .save()
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      res.status(404).json();
    });
};

const checkMail = async (req, res) => {
  req.body = JSON.parse(req.body);
  await OTP.find({ email: req.body.email })
    .then((users) => {
      if (users.length == 0) {
        return res.status(200).json();
      } else {
        res.status(404).json();
      }
    })
    .catch((err) => res.json(err));
};

const getOTP = async (req, res) => {
  email_id = req.body.email;
  response = await OTP.find({ email: email_id });
  return res.send(response);
};

const del_mail = async (req, res) => {
  req.body = JSON.parse(req.body);
  email_id = req.body.email;
  await OTP.deleteOne({ email: email_id })
    .then(() => {
      return res.status(201);
    })
    .catch((err) => {
      return res.status(500).json();
    });
};

const verifyOTP = async (req, res) => {
  req.body = JSON.parse(req.body);
  email_id = req.body.email;
  otp = req.body.otp;
  await OTP.find({ email: email_id }).then((response) => {
    if (response.length > 0) {
      const res_otp = response[0].otp;
      if (otp == res_otp) {
        res.status(200).json();
      } else {
        res.status(404).json();
      }
    } else {
      res.status(404).json();
    }
  });
};

module.exports = {
  storeOTP,
  checkMail,
  getOTP,
  del_mail,
  verifyOTP,
};
