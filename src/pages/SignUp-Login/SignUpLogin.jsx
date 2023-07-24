import { Link } from "react-router-dom";
import "./style.css";

export const SignUpLogin = () => {
  return (
    <div id="signUpLogin">
      <Link to="/signUp">
        <button id="btn">Sign up</button>
      </Link>
      <Link to="/login">
        <button id="btn">Login</button>
      </Link>
    </div>
  );
};
