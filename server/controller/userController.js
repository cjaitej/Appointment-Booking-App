const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  name: String,
});

var USER = mongoose.model("user", UserSchema);

const addUser = async (req, res) => {
  var user = new USER();
  req.body = JSON.parse(req.body);
  user.userName = req.body.userName;
  user.email = req.body.email;
  user.name = req.body.name;
  await user
    .save()
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      res.status(404).json();
    });
};

const checkMailUser = async (req, res) => {
  req.body = JSON.parse(req.body);
  await USER.find({ email: req.body.email })
    .then((users) => {
      if (users.length == 0) {
        return res.status(200).json();
      } else {
        res.status(404).json();
      }
    })
    .catch((err) => res.json(err));
};

module.exports = {
  checkMailUser,
  addUser,
};
