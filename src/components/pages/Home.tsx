import Header from "../Header";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function OnClickJoinUs() {
    navigate("/register");
  }
  return (
    <div className="Home">
      <Header></Header>
      <div className="home-body">
        <img className="home-body--photo" src="src\images\Home-Photo.png" />
        <div className="home-body--text">
          <h1 className="home-body--title">ApptSync</h1>
          <h2 className="home-body--moto">Plan. Schedule. Meet.</h2>
          <button className="home-body--button" onClick={OnClickJoinUs}>
            JOIN US
          </button>
        </div>
      </div>
    </div>
  );
}
