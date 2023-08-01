import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { useQuery, gql, useMutation } from "@apollo/client";

const AllTasks = gql`
  query {
    allTasks {
      id
      title
      description
      isCompleted
    }
  }
`;

const DeleteTask = gql`
  mutation ($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      id
    }
  }
`;
export const Tasks = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(AllTasks, {
    context: {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    },
  });
  refetch(); // Refetch data when navigating to this page

  // Use useMutation to get the mutate function.
  const [deleteTask] = useMutation(DeleteTask);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDelete = (taskId) => {
    // Call the mutate function here to trigger the mutation.
    deleteTask({
      variables: { taskId },
      context: {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      },
    })
      .then((response) => {
        console.log("Mutation successful!", response);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
  };
  return (
    <section>
      <button id="addTask" onClick={() => navigate("/addTask")}>
        Add task
      </button>

      {data.allTasks.map((task, index) => (
        <div className="task" key={index}>
          <p className="title">{task.title}</p>
          <span>{task.description}</span>
          <div className="edit-delete">
            <Link to="/editTask" state={task.id}>
              <button className="edit btn">Edit</button>
            </Link>

            <button
              className="delete btn"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
