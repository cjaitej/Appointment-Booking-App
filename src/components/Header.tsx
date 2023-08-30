import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/login");
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  function goToHome() {
    navigate("/");
  }
  return (
    <header className="header">
      <img className="header--logo" src="src\images\logo.png" />
      <h1 className="header--title" onClick={goToHome}>
        ApptSync
      </h1>
      <h2 className="header--login" onClick={handleLoginClick}>
        Log In
      </h2>
      <h2 className="header--register" onClick={handleRegisterClick}>
        Register
      </h2>
    </header>
  );
}

export default Header;
