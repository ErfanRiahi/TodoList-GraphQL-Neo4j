import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

const AddMember = gql`
  mutation addMember(
    $id: ID!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createMembers(
      input: [{ id: $id, name: $name, email: $email, password: $password }]
    ) {
      members {
        name
      }
    }
  }
`;

const AllMember = gql`
  query {
    members {
      name
    }
  }
`;

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  let numberOfMembers = 0;

  const { loading, error, data } = useQuery(AllMember);

  if (data) numberOfMembers = data.members.length;

  const [addNewMember] = useMutation(AddMember);
  const handleAdd = () => {
    // Call the mutate function here to trigger the mutation.
    addNewMember({
      variables: {
        id: numberOfMembers + 1,
        name: info.name,
        email: info.email,
        password: info.password,
      },
    })
      .then((response) => {
        console.log("Mutation successful!", response);
        navigate("/tasks");
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };
  return (
    <div id="signUpForm">
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          onBlur={(e) => setInfo({ ...info, name: e.target.value })}
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
