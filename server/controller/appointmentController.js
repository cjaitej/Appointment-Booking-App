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
  const result = [
    {
      timings: {
        "9:00 AM - 10:00 AM": 2,
        "10:00 AM - 11:00 AM": 0,
        "11:00 AM - 12:00 AM": 0,
        "12:00 AM - 1:00 PM": 0,
        "1:00 PM - 2:00 PM": 1,
        "2:00 PM - 3:00 PM": 0,
        "3:00 PM - 4:00 PM": 0,
        "4:00 PM - 5:00 PM": 0,
        "5:00 PM - 6:00 PM": 0,
      },
    },
  ];
  if (response.length == 0) {
    res.json({});
  } else {
    res.json(result);
  }
};

module.exports = {
  createAppt,
  checkDate,
};
