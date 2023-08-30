import { useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [Inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    otp: "",
  });
  const navigate = useNavigate();
  const myUrl = "http://localhost:5000";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputs((prev_state) => ({
      ...prev_state,
      [e.target.name]: e.target.value,
    }));
  }

  async function timeoutOTP(email_id: string) {
    return await fetch(myUrl + "/delMail", {
      method: "POST",
      body: JSON.stringify({ email: email_id }),
    });
  }

  async function handleVerify() {
    await fetch(myUrl + "/verifyOTP", {
      method: "POST",
      body: JSON.stringify({ email: Inputs.email, otp: Inputs.otp }),
    })
      .then(async (response) => {
        if (response.ok) {
          await fetch(myUrl + "/addUser", {
            method: "POST",
            body: JSON.stringify({
              email: Inputs.email,
              userName: Inputs.username,
              name: Inputs.name,
            }),
          }).then(() => {
            timeoutOTP(Inputs.email);
            alert("Account Created, Please Login");
            navigate("/login");
          });
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
        email: Inputs.email,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          await fetch(myUrl + "/checkMail", {
            method: "POST",
            body: JSON.stringify({
              email: Inputs.email,
            }),
          }).then(async (res) => {
            if (res.ok) {
              await fetch(myUrl + "/sendOTP", {
                method: "POST",
                body: JSON.stringify({
                  email: Inputs.email,
                  otp: randomNumber.toString(),
                }),
              });
            } else {
              alert("OTP is Already sent to " + Inputs.email);
              return 0;
            }
            await fetch(myUrl + "/storeOTP", {
              method: "POST",
              body: JSON.stringify({
                email: Inputs.email,
                otp: randomNumber.toString(),
              }),
            }).then(() => {
              setTimeout(timeoutOTP, 2 * 60000, Inputs.email);
            });
          });
        } else {
          alert("Account Already Exists");
          return 0;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function directToLogin() {
    navigate("/login");
  }

  return (
    <div>
      <Header></Header>;
      <div className="register">
        <div className="register--form">
          <h1 className="register--title">Create a ApptSync Account</h1>
          <form className="form" onSubmit={handleClick}>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              className="form--field"
              placeholder="Name"
              value={Inputs.name}
            />
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="form--field"
              placeholder="Username"
              value={Inputs.username}
            />
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="form--field"
              placeholder="Email"
              value={Inputs.email}
            />
          </form>
          <button onClick={handleClick} className="register--submit">
            Send
          </button>
          <div className="register--otp">
            <input
              onChange={handleChange}
              type="number"
              name="otp"
              className="otp--field"
              placeholder="OTP"
            />
            <button onClick={handleVerify} className="otp--submit">
              Verify
            </button>
          </div>
          <div className="register--login">
            <h3 className="register--ask">Already on ApptSync?</h3>
            <h3 className="login--link" onClick={directToLogin}>
              Login
            </h3>
          </div>
        </div>
        <img className="register--image" src="src\images\Register-Photo.png" />
      </div>
    </div>
  );
}
