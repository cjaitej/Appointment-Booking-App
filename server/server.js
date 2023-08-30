const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const appRoute = require("./routers/route.js");
const { OTP } = require("./otp/otpController.js");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.text());

app.use(express.json());
app.use("/", appRoute);

const connectDB = mongoose
  .connect(
    "mongodb+srv://cjaitej:Lxt4lwIBdcS49aaR@cluster0.xlgvcf0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("DB Connected!!");
  })
  .catch((err) => {
    console.log("DB not Connected!!");
  });

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
