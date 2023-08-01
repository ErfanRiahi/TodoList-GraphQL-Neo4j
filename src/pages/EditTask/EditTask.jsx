import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const OneTask = gql`
  query GetTask($id: ID!) {
    tasks(where: { id: $id }) {
      id
      title
      description
    }
  }
`;

const EditTaskBtn = gql`
  mutation (
    $taskId: ID!
    $title: String
    $desc: String
    $isCompleted: Boolean
  ) {
    editTask(
      taskId: $taskId
      title: $title
      description: $desc
      isCompleted: $isCompleted
    ) {
      id
    }
  }
`;

export const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state; //  Get the task id that is gonna edit

  const { loading, error, data } = useQuery(OneTask, {
    variables: { id },
  });

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const [desc, setDesc] = useState("");
  const handleChangeDesc = (e) => setDesc(e.target.value);

  //  Fill title and description input when data received
  useEffect(() => {
    if (data) {
      setTitle(data.tasks[0].title);
      setDesc(data.tasks[0].description);
    }
  }, [data]);

  // Use useMutation to get the mutate function.
  const [editTask] = useMutation(EditTaskBtn);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleEdit = () => {
    // Call the mutate function here to trigger the mutation.
    editTask({
      variables: { taskId: id, title, desc, isCompleted: false },
      context: {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
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
    <div id="editTaskForm">
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <div>
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          rows="3"
          value={desc}
          onChange={handleChangeDesc}
        ></textarea>
      </div>
      <div id="btnS">
        <button id="back-btn" onClick={() => navigate("/tasks")}>
          back
        </button>
        <button id="editTask-btn" onClick={handleEdit}>
          Edit task
        </button>
      </div>
    </div>
  );
};
