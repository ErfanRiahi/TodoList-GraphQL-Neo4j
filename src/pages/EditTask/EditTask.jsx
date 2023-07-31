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
  mutation EditTask($id: ID!, $title: String!, $desc: String) {
    updateTasks(
      where: { id: $id }
      update: { title: $title, description: $desc }
    ) {
      tasks {
        id
        title
        description
      }
    }
  }
`;

export const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;

  const { loading, error, data } = useQuery(OneTask, {
    variables: { id },
  });

  const [title, setTitle] = useState("");
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const [desc, setDesc] = useState("");
  const handleChangeDesc = (e) => setDesc(e.target.value);

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
      variables: { id: data.tasks[0].id, title, desc },
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
