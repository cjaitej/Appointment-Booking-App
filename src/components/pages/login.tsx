import Header from "../Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email_id, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const myUrl = "http://localhost:5000";

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function OTPOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOTP(e.target.value);
  }

  async function timeoutOTP(email_id: string) {
    await fetch(myUrl + "/delMail", {
      method: "POST",
      body: JSON.stringify({ email: email_id }),
    });
    return 0;
  }

  async function handleLogin() {
    await fetch(myUrl + "/verifyOTP", {
      method: "POST",
      body: JSON.stringify({ email: email_id, otp: otp }),
    })
      .then(async (response) => {
        if (response.ok) {
          timeoutOTP(email_id);
          navigate("/appointment", { state: { email: email_id } });
        } else {
          alert("Wrong OTP");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClick() {
    const randomNumber = Math.floor(Math.random() * (999999 - 100000) + 100000);

    await fetch(myUrl + "/checkMailUser", {
      method: "POST",
      body: JSON.stringify({
        email: email_id,
      }),
    }).then(async (res) => {
      if (res.ok) {
        alert("Create an Account");
      } else {
        await fetch(myUrl + "/checkMail", {
          method: "POST",
          body: JSON.stringify({
            email: email_id,
          }),
        }).then(async (res) => {
          if (res.ok) {
            await fetch(myUrl + "/sendOTP", {
              method: "POST",
              body: JSON.stringify({
                email: email_id,
                otp: randomNumber.toString(),
              }),
            });
          } else {
            alert("OTP is Already sent to " + email_id);
            return 0;
          }
          await fetch(myUrl + "/storeOTP", {
            method: "POST",
            body: JSON.stringify({
              email: email_id,
              otp: randomNumber.toString(),
            }),
          }).then(() => {
            setTimeout(timeoutOTP, 2 * 60000, email_id);
          });
        });
      }
    });
  }
  return (
    <div>
      <Header></Header>
      <div className="login">
        <img className="login--image" src="src\images\Login-Photo.png" />
        <div className="login--text">
          <h1 className="login--title">Sign in to ApptSync</h1>
          <input
            onChange={handleOnChange}
            className="login--field"
            type="Email"
            name="email"
            placeholder="Enter Email"
            value={email_id}
          />
          <button onClick={handleClick} className="login--button">
            Send OTP
          </button>
          <div className="otp-check">
            <input
              onChange={OTPOnChange}
              className="login-otp--field"
              type="number"
              name="OTP"
              placeholder="OTP"
              value={otp}
            />
            <button onClick={handleLogin} className="login--button">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
