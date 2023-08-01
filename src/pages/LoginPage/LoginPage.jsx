import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        id
      }
    }
  }
`;

export const LoginPage = () => {
  //  Clear username and token when login page come up
  sessionStorage.setItem("username", "");
  sessionStorage.setItem("token", "");

  const navigate = useNavigate();

  //  Create info variable to store user info
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  //  Handle any error about existing email or wrong password
  const [isValidate, setIsValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [checkLogin] = useMutation(LOGIN);
  const handleLogin = () => {
    // Call the mutate function here to trigger the mutation.
    checkLogin({
      variables: {
        email: info.email,
        password: info.password,
      },
    })
      .then((response) => {
        console.log("Mutation successful!", response);
        sessionStorage.setItem("token", response.data.login.token);
        sessionStorage.setItem("username", response.data.login.user.username);
        navigate("/tasks");
      })
      .catch((error) => {
        console.error("Mutation error:", error);
        setIsValidate(true);
        setErrorMessage(error.toString().slice(13, 38)); // Show error message under password input
      });
  };
  return (
    <div id="loginForm">
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          onBlur={(e) => setInfo({ ...info, email: e.target.value })}
        />
      </div>
      <div id="password">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onBlur={(e) => setInfo({ ...info, password: e.target.value })}
        />
        {isValidate ? <label id="incorrect">{errorMessage}</label> : ""}
      </div>
      <button id="login-btn" onClick={handleLogin}>
        Login
      </button>
      <p id="haveAccount">
        No account?! <Link to="/">Sign up</Link>
      </p>
    </div>
  );
};
