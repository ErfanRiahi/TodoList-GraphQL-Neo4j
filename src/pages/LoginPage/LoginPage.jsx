import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GetMember = gql`
  query GetMember($email: String!) {
    members(where: { email: $email }) {
      id
      name
    }
  }
`;

export const LoginPage = () => {
  sessionStorage.setItem("username", "");
  sessionStorage.setItem("memberId", "");
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [getMember, { loading, data }] = useLazyQuery(GetMember, {
    // Define what to do when the query is successful
    onCompleted: (data) => {
      console.log(data);
      sessionStorage.setItem("username", data.members[0].name);
      sessionStorage.setItem("memberId", data.members[0].id);

      navigate("/tasks");
      // You can use history.push to redirect the user here after login
      // For example, history.push("/tasks", { data });
    },
    // Define what to do if there's an error with the query
    onError: (error) => {
      console.log("Error:", error.message);
    },
  });
  const handleLogin = () => {
    getMember({
      variables: { email: info.email },
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
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onBlur={(e) => setInfo({ ...info, password: e.target.value })}
        />
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
