import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Calender from "./components/pages/Calender";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="appointment" element={<Calender />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
