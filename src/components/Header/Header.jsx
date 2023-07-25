import { Link } from "react-router-dom";
import "./style.css";

export const Header = () => {
  return (
    <header id="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Sign up / Login</Link>
          </li>
          <li>
            Welcome <span id="name">Erfan</span>
          </li>
          <li>
            <Link to="/">Log out</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
