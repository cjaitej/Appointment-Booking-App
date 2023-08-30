const mongoose = require("mongoose");

const AppointmentScheme = new mongoose.Schema({
  date: String,
  timings: Object,
});

var APP = mongoose.model("appointments", AppointmentScheme);

const createAppt = async (req, res) => {
  var user = new APP();
  req.body = JSON.parse(req.body);
  user.date = req.body.date;
  user.timings = req.body.timings;

  await user
    .save()
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json();
    });
};

const checkDate = async (req, res) => {
  req.body = JSON.parse(req.body);
  const response = await APP.find({ date: req.body.date });
  if (response.length == 0) {
    res.status(500).json();
  } else {
    if (req.body.item in Object.keys(response[0]["timings"])) {
      res.status(200).json();
    } else {
      res.status(500).json();
    }
  }
};

module.exports = {
  createAppt,
  checkDate,
};
