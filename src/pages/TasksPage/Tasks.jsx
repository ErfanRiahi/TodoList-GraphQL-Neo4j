import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { useQuery, gql, useMutation } from "@apollo/client";

const AllTasks = gql`
  query GetTasks($id: ID!) {
    tasks(where: { member_SOME: { id: $id } }) {
      id
      title
      description
    }
  }
`;

const DeleteTask = gql`
  mutation deleteTask($id: ID!) {
    deleteTasks(where: { id: $id }) {
      nodesDeleted
    }
  }
`;
export const Tasks = () => {
  const memberId = sessionStorage.getItem("memberId");
  const { loading, error, data, refetch } = useQuery(AllTasks, {
    variables: { id: memberId },
  });
  refetch();

  // Use useMutation to get the mutate function.
  const [addNewTask] = useMutation(DeleteTask);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDelete = (taskId) => {
    // Call the mutate function here to trigger the mutation.
    addNewTask({
      variables: { id: taskId },
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
      <Link
        to="/addTask"
        state={[data.tasks.length, memberId]}
        id="addTaskLink"
      >
        <button id="addTask">Add task</button>
      </Link>
      {data.tasks.map((task, index) => (
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
