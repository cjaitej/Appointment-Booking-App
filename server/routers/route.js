const router = require("express").Router();
const { sendOTP } = require("../controller/appController.js");
const {
  createAppt,
  checkDate,
} = require("../controller/appointmentController.js");
const { checkMailUser, addUser } = require("../controller/userController.js");

const {
  storeOTP,
  checkMail,
  getOTP,
  del_mail,
  verifyOTP,
} = require("../otp/otpController.js");

router.post("/sendOTP", sendOTP);

router.post("/storeOTP", storeOTP);

router.post("/checkMail", checkMail);

router.post("/delMail", del_mail);

router.post("/verifyOTP", verifyOTP);

router.get("/getOTP", getOTP);

router.post("/checkMailUser", checkMailUser);

router.post("/addUser", addUser);

router.post("/createAppt", createAppt);

router.post("/checkDate", checkDate);

module.exports = router;
