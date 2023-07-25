import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const AddNewTask = gql`
  mutation AddTask($id: ID!, $title: String!, $desc: String, $memberId: ID!) {
    createTasks(
      input: [
        {
          id: $id
          title: $title
          description: $desc
          isCompleted: false
          member: { connect: { where: { node: { id: $memberId } } } }
        }
      ]
    ) {
      tasks {
        id
        title
        description
      }
    }
  }
`;

export const AddTask = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const location = useLocation();
  const numberOfTasks = location.state[0];
  const memberId = location.state[1];

  const navigate = useNavigate();

  // Use useMutation to get the mutate function.
  const [addNewTask] = useMutation(AddNewTask);

  const handleAdd = () => {
    // Call the mutate function here to trigger the mutation.
    addNewTask({
      variables: { id: numberOfTasks + 1, title, desc, memberId },
    })
      .then((response) => {
        console.log("Mutation successful!", response);
        navigate("/tasks", { state: memberId });
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
      <button id="addTask-btn" onClick={handleAdd}>
        Add task
      </button>
    </div>
  );
};
