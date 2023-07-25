import { Link } from "react-router-dom";
import "./style.css";

export const Footer = () => {
  return (
    <footer id="footer">
      <nav>
        <ul>
          <li>
            <Link to="https://t.me/ern401" target="_blank">
              ©ERN401
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
