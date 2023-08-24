import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "./style.css";

const AddUser = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addNewUser] = useMutation(AddUser);
  const handleAdd = () => {
    // Call the mutate function here to trigger the mutation.
    addNewUser({
      variables: {
        username: info.username,
        email: info.email,
        password: info.password,
      },
    })
      .then((response) => {
        console.log("Mutation successful!", response);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };
  return (
    <div id="signUpForm">
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          onBlur={(e) => setInfo({ ...info, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          onBlur={(e) => setInfo({ ...info, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onBlur={(e) => setInfo({ ...info, password: e.target.value })}
        />
      </div>
      <button id="signUp-btn" onClick={handleAdd}>
        Sign up
      </button>
      <p id="haveAccount">
        Have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};
