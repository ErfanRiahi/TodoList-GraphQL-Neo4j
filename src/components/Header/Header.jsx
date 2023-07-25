import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export const Header = () => {
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("memberId", "");
    navigate("/login");
  };
  return (
    <header id="header">
      <nav>
        <ul>
          <li>
            Welcome <span id="name">{username}</span>
          </li>
          <li id="logout" onClick={handleLogOut}>
            Log out
          </li>
        </ul>
      </nav>
    </header>
  );
};
