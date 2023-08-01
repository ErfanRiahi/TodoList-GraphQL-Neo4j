import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const AddNewTask = gql`
  mutation ($title: String!, $desc: String) {
    addTask(title: $title, description: $desc) {
      id
    }
  }
`;

export const AddTask = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  const navigate = useNavigate();

  // Use useMutation to get the mutate function.
  const [addNewTask] = useMutation(AddNewTask);

  const handleAdd = () => {
    // Call the mutate function here to trigger the mutation.
    addNewTask({
      //  Fill variables and headers
      variables: { title, desc },
      context: {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
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
    <div id="addTaskForm">
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          onBlur={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          rows="2"
          onBlur={(e) => setDesc(e.target.value)}
        />
      </div>
      <div id="btnS">
        <button id="back-btn" onClick={() => navigate("/tasks")}>
          back
        </button>
        <button id="addTask-btn" onClick={handleAdd}>
          Add task
        </button>
      </div>
    </div>
  );
};
