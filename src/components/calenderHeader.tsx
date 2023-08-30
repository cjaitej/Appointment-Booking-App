import { useNavigate } from "react-router-dom";
interface props {
  email: string;
}
function CalenderHeader(props: props) {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/");
  }

  function handleLogout() {}

  return (
    <header className="header">
      <img className="header--logo" src="src\images\logo.png" />
      <h1 className="header--title" onClick={goToHome}>
        ApptSync
      </h1>
      <h1 className="header--login" onClick={goToHome}>
        Hello, {props.email.split("@")[0]}.
      </h1>
      {/* <h1>{email_id}</h1> */}

      <h2 className="Calenderheader--login" onClick={handleLogout}>
        LogOut
      </h2>
    </header>
  );
}

export default CalenderHeader;
